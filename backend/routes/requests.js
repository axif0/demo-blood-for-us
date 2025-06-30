const express = require('express');
const { promisePool } = require('../config/database');
const { authenticateToken, allowUserTypes } = require('../middleware/auth');
const { validateBloodRequest, validateId, validatePagination } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/requests
// @desc    Create a new blood request
// @access  Private (donors, seekers and hospitals)
router.post('/', authenticateToken, allowUserTypes(['individual_donor', 'individual_seeker', 'hospital']), validateBloodRequest, async (req, res) => {
  try {
    const {
      patient_name,
      blood_group,
      units_needed,
      urgency,
      hospital_name,
      hospital_address,
      contact_number,
      description,
      required_by,
      status = 'active'
    } = req.body;

    const query = `
      INSERT INTO blood_requests (
        requester_id, patient_name, blood_group, units_needed,
        urgency, hospital_name, hospital_address, contact_number,
        description, required_by, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      req.user.id,
      patient_name,
      blood_group,
      units_needed,
      urgency,
      hospital_name,
      hospital_address,
      contact_number,
      description || null,
      required_by,
      status
    ];

    const [result] = await promisePool.execute(query, values);

    // Get the created request
    const [requestRows] = await promisePool.execute(
      'SELECT * FROM blood_requests WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: `Blood request ${status === 'draft' ? 'saved as draft' : 'created'} successfully`,
      data: {
        request: requestRows[0]
      }
    });

  } catch (error) {
    console.error('Create request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blood request',
      error: error.message
    });
  }
});

// @route   GET /api/requests/nearby
// @desc    Get nearby blood requests
// @access  Public
router.get('/nearby', validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const { location, radius = 50, blood_group } = req.query;

    let query = `
      SELECT br.*, u.name as requester_name, u.hospital_name as requester_hospital
      FROM blood_requests br
      LEFT JOIN users u ON br.requester_id = u.id
      WHERE br.status = 'active' AND br.required_by > NOW()
    `;
    
    const queryParams = [];

    // Add blood group filter if provided
    if (blood_group) {
      query += ` AND br.blood_group = ?`;
      queryParams.push(blood_group);
    }

    // TODO: Add location-based filtering when location data is available
    // For now, just return all active requests ordered by urgency and date

    query += ` ORDER BY 
      CASE 
        WHEN br.urgency = 'critical' THEN 1
        WHEN br.urgency = 'high' THEN 2  
        WHEN br.urgency = 'medium' THEN 3
        WHEN br.urgency = 'low' THEN 4
      END,
      br.required_by ASC 
      LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const [rows] = await promisePool.execute(query, queryParams);

    res.json({
      success: true,
      message: 'Nearby blood requests retrieved successfully',
      data: {
        requests: rows,
        pagination: {
          page,
          limit,
          total: rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get nearby requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get nearby blood requests',
      error: error.message
    });
  }
});

// @route   GET /api/requests/urgent
// @desc    Get urgent blood requests
// @access  Public
router.get('/urgent', validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = `
      SELECT br.*, u.name as requester_name, u.hospital_name as requester_hospital
      FROM blood_requests br
      LEFT JOIN users u ON br.requester_id = u.id
      WHERE br.status = 'active' 
        AND br.required_by > NOW()
        AND br.urgency IN ('critical', 'high')
      ORDER BY 
        CASE 
          WHEN br.urgency = 'critical' THEN 1
          WHEN br.urgency = 'high' THEN 2  
        END,
        br.required_by ASC 
      LIMIT ? OFFSET ?
    `;

    const [rows] = await promisePool.execute(query, [limit, offset]);

    res.json({
      success: true,
      message: 'Urgent blood requests retrieved successfully',
      data: {
        requests: rows,
        pagination: {
          page,
          limit,
          total: rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get urgent requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get urgent blood requests',
      error: error.message
    });
  }
});

// @route   GET /api/requests/accepted
// @desc    Get blood requests accepted by current user
// @access  Private
router.get('/accepted', authenticateToken, validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = `
      SELECT br.*, u.name as requester_name, u.hospital_name as requester_hospital,
             ra.accepted_at
      FROM blood_requests br
      LEFT JOIN users u ON br.requester_id = u.id
      INNER JOIN request_acceptances ra ON br.id = ra.request_id
      WHERE ra.donor_id = ? AND ra.status = 'accepted'
      ORDER BY ra.accepted_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await promisePool.execute(query, [req.user.id, limit, offset]);

    res.json({
      success: true,
      message: 'Accepted blood requests retrieved successfully',
      data: {
        requests: rows,
        pagination: {
          page,
          limit,
          total: rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get accepted requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get accepted blood requests',
      error: error.message
    });
  }
});

// @route   GET /api/requests/completed
// @desc    Get completed blood requests (where user donated)
// @access  Private
router.get('/completed', authenticateToken, validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = `
      SELECT br.*, u.name as requester_name, u.hospital_name as requester_hospital,
             d.donation_date, d.units_donated, d.status as donation_status
      FROM blood_requests br
      LEFT JOIN users u ON br.requester_id = u.id
      INNER JOIN donations d ON br.id = d.request_id
      WHERE d.donor_id = ? AND d.status = 'completed'
      ORDER BY d.donation_date DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await promisePool.execute(query, [req.user.id, limit, offset]);

    res.json({
      success: true,
      message: 'Completed blood requests retrieved successfully',
      data: {
        requests: rows,
        pagination: {
          page,
          limit,
          total: rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get completed requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get completed blood requests',
      error: error.message
    });
  }
});

// @route   POST /api/requests/:id/accept
// @desc    Accept a blood request
// @access  Private (donors only)
router.post('/:id/accept', authenticateToken, allowUserTypes(['individual_donor']), validateId, async (req, res) => {
  try {
    const requestId = req.params.id;
    const donorId = req.user.id;

    // Check if request exists and is active
    const [requestRows] = await promisePool.execute(
      'SELECT * FROM blood_requests WHERE id = ? AND status = "active"',
      [requestId]
    );

    if (requestRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found or not active'
      });
    }

    const request = requestRows[0];

    // Check if request is not expired
    if (new Date(request.required_by) <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'This blood request has expired'
      });
    }

    // Check if user has already accepted this request
    const [existingAcceptance] = await promisePool.execute(
      'SELECT * FROM request_acceptances WHERE request_id = ? AND donor_id = ?',
      [requestId, donorId]
    );

    if (existingAcceptance.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You have already accepted this request'
      });
    }

    // Insert acceptance record
    await promisePool.execute(
      'INSERT INTO request_acceptances (request_id, donor_id, status, accepted_at) VALUES (?, ?, "accepted", NOW())',
      [requestId, donorId]
    );

    res.json({
      success: true,
      message: 'Blood request accepted successfully'
    });

  } catch (error) {
    console.error('Accept request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to accept blood request',
      error: error.message
    });
  }
});

// @route   GET /api/requests
// @desc    Get all blood requests (with filters)
// @access  Public
router.get('/', validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const { blood_group, urgency, status = 'active' } = req.query;

    let query = `
      SELECT br.*, u.name as requester_name, u.hospital_name as requester_hospital
      FROM blood_requests br
      LEFT JOIN users u ON br.requester_id = u.id
      WHERE 1=1
    `;
    
    const queryParams = [];

    // Add filters
    if (blood_group) {
      query += ` AND br.blood_group = ?`;
      queryParams.push(blood_group);
    }

    if (urgency) {
      query += ` AND br.urgency = ?`;
      queryParams.push(urgency);
    }

    if (status) {
      query += ` AND br.status = ?`;
      queryParams.push(status);
    }

    // Only show active requests by default, or if not expired
    if (status === 'active') {
      query += ` AND br.required_by > NOW()`;
    }

    query += ` ORDER BY br.urgency DESC, br.required_by ASC LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const [rows] = await promisePool.execute(query, queryParams);

    res.json({
      success: true,
      message: 'Blood requests retrieved successfully',
      data: {
        requests: rows,
        filters: {
          blood_group,
          urgency,
          status
        },
        pagination: {
          page,
          limit,
          total: rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get blood requests',
      error: error.message
    });
  }
});

// @route   GET /api/requests/:id
// @desc    Get specific blood request by ID
// @access  Public
router.get('/:id', validateId, async (req, res) => {
  try {
    const requestId = req.params.id;

    const query = `
      SELECT br.*, u.name as requester_name, u.hospital_name as requester_hospital,
             u.phone_number as requester_phone
      FROM blood_requests br
      LEFT JOIN users u ON br.requester_id = u.id
      WHERE br.id = ?
    `;

    const [rows] = await promisePool.execute(query, [requestId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found'
      });
    }

    res.json({
      success: true,
      message: 'Blood request retrieved successfully',
      data: {
        request: rows[0]
      }
    });

  } catch (error) {
    console.error('Get request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get blood request',
      error: error.message
    });
  }
});

// @route   GET /api/requests/user/mine
// @desc    Get current user's blood requests
// @access  Private
router.get('/user/mine', authenticateToken, validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const { status } = req.query;

    let query = `
      SELECT * FROM blood_requests 
      WHERE requester_id = ?
    `;
    
    const queryParams = [req.user.id];

    if (status) {
      query += ` AND status = ?`;
      queryParams.push(status);
    }

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const [rows] = await promisePool.execute(query, queryParams);

    res.json({
      success: true,
      message: 'User blood requests retrieved successfully',
      data: {
        requests: rows,
        pagination: {
          page,
          limit,
          total: rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get user requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user blood requests',
      error: error.message
    });
  }
});

// @route   PUT /api/requests/:id
// @desc    Update blood request
// @access  Private (only request owner)
router.put('/:id', authenticateToken, validateId, async (req, res) => {
  try {
    const requestId = req.params.id;
    
    // Check if request exists and belongs to user
    const [requestRows] = await promisePool.execute(
      'SELECT * FROM blood_requests WHERE id = ? AND requester_id = ?',
      [requestId, req.user.id]
    );

    if (requestRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found or access denied'
      });
    }

    const request = requestRows[0];

    // Don't allow updating fulfilled or cancelled requests
    if (request.status !== 'active' && request.status !== 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update non-active blood requests'
      });
    }

    const allowedFields = [
      'patient_name', 'units_needed', 'urgency', 
      'hospital_name', 'hospital_address', 'contact_number', 
      'description', 'required_by', 'status'
    ];

    const updates = [];
    const values = [];

    for (const [key, value] of Object.entries(req.body)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    values.push(requestId);
    const updateQuery = `UPDATE blood_requests SET ${updates.join(', ')} WHERE id = ?`;

    await promisePool.execute(updateQuery, values);

    // Get updated request
    const [updatedRows] = await promisePool.execute(
      'SELECT * FROM blood_requests WHERE id = ?',
      [requestId]
    );

    res.json({
      success: true,
      message: 'Blood request updated successfully',
      data: {
        request: updatedRows[0]
      }
    });

  } catch (error) {
    console.error('Update request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blood request',
      error: error.message
    });
  }
});

// @route   PATCH /api/requests/:id/status
// @desc    Update blood request status
// @access  Private (request owner or donor who fulfilled it)
router.patch('/:id/status', authenticateToken, validateId, async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    if (!['active', 'fulfilled', 'cancelled', 'expired', 'draft'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    // Check if request exists
    const [requestRows] = await promisePool.execute(
      'SELECT * FROM blood_requests WHERE id = ?',
      [requestId]
    );

    if (requestRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found'
      });
    }

    const request = requestRows[0];

    // Check permissions
    const isOwner = request.requester_id === req.user.id;
    
    // For fulfilled status, check if user has a donation for this request
    let canFulfill = false;
    if (status === 'fulfilled') {
      const [donationRows] = await promisePool.execute(
        'SELECT * FROM donations WHERE request_id = ? AND donor_id = ?',
        [requestId, req.user.id]
      );
      canFulfill = donationRows.length > 0;
    }

    if (!isOwner && !canFulfill) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update status
    await promisePool.execute(
      'UPDATE blood_requests SET status = ? WHERE id = ?',
      [status, requestId]
    );

    // Get updated request
    const [updatedRows] = await promisePool.execute(
      'SELECT * FROM blood_requests WHERE id = ?',
      [requestId]
    );

    res.json({
      success: true,
      message: 'Blood request status updated successfully',
      data: {
        request: updatedRows[0]
      }
    });

  } catch (error) {
    console.error('Update request status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blood request status',
      error: error.message
    });
  }
});

// @route   DELETE /api/requests/:id
// @desc    Delete blood request
// @access  Private (only request owner)
router.delete('/:id', authenticateToken, validateId, async (req, res) => {
  try {
    const requestId = req.params.id;

    // Check if request exists and belongs to user
    const [requestRows] = await promisePool.execute(
      'SELECT * FROM blood_requests WHERE id = ? AND requester_id = ?',
      [requestId, req.user.id]
    );

    if (requestRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Blood request not found or access denied'
      });
    }

    // Delete the request
    await promisePool.execute('DELETE FROM blood_requests WHERE id = ?', [requestId]);

    res.json({
      success: true,
      message: 'Blood request deleted successfully'
    });

  } catch (error) {
    console.error('Delete request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blood request',
      error: error.message
    });
  }
});

module.exports = router; 
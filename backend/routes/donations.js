const express = require('express');
const { promisePool } = require('../config/database');
const { authenticateToken, requireRole, allowUserTypes } = require('../middleware/auth');
const { validateDonation, validateId, validatePagination } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/donations
// @desc    Schedule a new donation
// @access  Private (donors only)
router.post('/', authenticateToken, requireRole('donor'), validateDonation, async (req, res) => {
  try {
    const {
      request_id,
      hospital_name,
      donation_date,
      units_donated = 1,
      notes
    } = req.body;

    // If request_id is provided, validate it exists and is active
    if (request_id) {
      const [requestRows] = await promisePool.execute(
        'SELECT * FROM blood_requests WHERE id = ? AND status = "active"',
        [request_id]
      );

      if (requestRows.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or inactive blood request'
        });
      }

      const request = requestRows[0];

      // Check if donor's blood group matches request
      if (req.user.blood_group !== request.blood_group) {
        return res.status(400).json({
          success: false,
          message: 'Your blood group does not match the request'
        });
      }
    }

    const query = `
      INSERT INTO donations (
        donor_id, request_id, hospital_name, donation_date,
        units_donated, notes
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      req.user.id,
      request_id || null,
      hospital_name,
      donation_date,
      units_donated,
      notes || null
    ];

    const [result] = await promisePool.execute(query, values);

    // Get the created donation
    const [donationRows] = await promisePool.execute(
      'SELECT * FROM donations WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Donation scheduled successfully',
      data: {
        donation: donationRows[0]
      }
    });

  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule donation',
      error: error.message
    });
  }
});

// @route   GET /api/donations
// @desc    Get all donations (for hospitals/admins)
// @access  Private (hospitals only)
router.get('/', authenticateToken, allowUserTypes(['hospital']), validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const { status, hospital_name } = req.query;

    let query = `
      SELECT d.*, u.name as donor_name, u.blood_group, u.phone_number as donor_phone,
             br.patient_name, br.urgency
      FROM donations d
      LEFT JOIN users u ON d.donor_id = u.id
      LEFT JOIN blood_requests br ON d.request_id = br.id
      WHERE 1=1
    `;
    
    const queryParams = [];

    // Add filters
    if (status) {
      query += ` AND d.status = ?`;
      queryParams.push(status);
    }

    if (hospital_name) {
      query += ` AND d.hospital_name LIKE ?`;
      queryParams.push(`%${hospital_name}%`);
    }

    query += ` ORDER BY d.donation_date ASC LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const [rows] = await promisePool.execute(query, queryParams);

    res.json({
      success: true,
      message: 'Donations retrieved successfully',
      data: {
        donations: rows,
        filters: {
          status,
          hospital_name
        },
        pagination: {
          page,
          limit,
          total: rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get donations',
      error: error.message
    });
  }
});

// @route   GET /api/donations/:id
// @desc    Get specific donation by ID
// @access  Private (donor who created it or hospital)
router.get('/:id', authenticateToken, validateId, async (req, res) => {
  try {
    const donationId = req.params.id;

    const query = `
      SELECT d.*, u.name as donor_name, u.blood_group, u.phone_number as donor_phone,
             br.patient_name, br.urgency, br.hospital_name as request_hospital
      FROM donations d
      LEFT JOIN users u ON d.donor_id = u.id
      LEFT JOIN blood_requests br ON d.request_id = br.id
      WHERE d.id = ?
    `;

    const [rows] = await promisePool.execute(query, [donationId]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    const donation = rows[0];

    // Check access permissions
    const isDonor = req.user.user_type === 'individual' && req.user.role === 'donor' && req.user.id === donation.donor_id;
    const isHospital = req.user.user_type === 'hospital';

    if (!isDonor && !isHospital) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      message: 'Donation retrieved successfully',
      data: {
        donation
      }
    });

  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get donation',
      error: error.message
    });
  }
});

// @route   GET /api/donations/user/mine
// @desc    Get current user's donations
// @access  Private (donors only)
router.get('/user/mine', authenticateToken, requireRole('donor'), validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const query = `
      SELECT d.*, br.patient_name, br.urgency
      FROM donations d
      LEFT JOIN blood_requests br ON d.request_id = br.id
      WHERE d.donor_id = ? 
      ORDER BY d.donation_date DESC 
      LIMIT ? OFFSET ?
    `;

    const [rows] = await promisePool.execute(query, [req.user.id, limit, offset]);

    res.json({
      success: true,
      message: 'User donations retrieved successfully',
      data: {
        donations: rows,
        pagination: {
          page,
          limit,
          total: rows.length
        }
      }
    });

  } catch (error) {
    console.error('Get user donations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user donations',
      error: error.message
    });
  }
});

// @route   PUT /api/donations/:id
// @desc    Update donation
// @access  Private (only donation owner)
router.put('/:id', authenticateToken, validateId, async (req, res) => {
  try {
    const donationId = req.params.id;
    
    // Check if donation exists and belongs to user
    const [donationRows] = await promisePool.execute(
      'SELECT * FROM donations WHERE id = ? AND donor_id = ?',
      [donationId, req.user.id]
    );

    if (donationRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found or access denied'
      });
    }

    const donation = donationRows[0];

    // Don't allow updating completed or cancelled donations
    if (donation.status !== 'scheduled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update non-scheduled donations'
      });
    }

    const allowedFields = ['hospital_name', 'donation_date', 'units_donated', 'notes'];

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

    values.push(donationId);
    const updateQuery = `UPDATE donations SET ${updates.join(', ')} WHERE id = ?`;

    await promisePool.execute(updateQuery, values);

    // Get updated donation
    const [updatedRows] = await promisePool.execute(
      'SELECT * FROM donations WHERE id = ?',
      [donationId]
    );

    res.json({
      success: true,
      message: 'Donation updated successfully',
      data: {
        donation: updatedRows[0]
      }
    });

  } catch (error) {
    console.error('Update donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donation',
      error: error.message
    });
  }
});

// @route   PATCH /api/donations/:id/status
// @desc    Update donation status
// @access  Private (donor who created it or hospital)
router.patch('/:id/status', authenticateToken, validateId, async (req, res) => {
  try {
    const donationId = req.params.id;
    const { status } = req.body;

    if (!['scheduled', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    // Check if donation exists
    const [donationRows] = await promisePool.execute(
      'SELECT * FROM donations WHERE id = ?',
      [donationId]
    );

    if (donationRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    const donation = donationRows[0];

    // Check permissions
    const isDonor = req.user.user_type === 'individual' && req.user.role === 'donor' && req.user.id === donation.donor_id;
    const isHospital = req.user.user_type === 'hospital';

    if (!isDonor && !isHospital) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update status
    await promisePool.execute(
      'UPDATE donations SET status = ? WHERE id = ?',
      [status, donationId]
    );

    // If donation is completed and linked to a request, update request status
    if (status === 'completed' && donation.request_id) {
      await promisePool.execute(
        'UPDATE blood_requests SET status = "fulfilled" WHERE id = ?',
        [donation.request_id]
      );
    }

    // Get updated donation
    const [updatedRows] = await promisePool.execute(
      'SELECT * FROM donations WHERE id = ?',
      [donationId]
    );

    res.json({
      success: true,
      message: 'Donation status updated successfully',
      data: {
        donation: updatedRows[0]
      }
    });

  } catch (error) {
    console.error('Update donation status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update donation status',
      error: error.message
    });
  }
});

// @route   DELETE /api/donations/:id
// @desc    Delete donation
// @access  Private (only donation owner, and only if scheduled)
router.delete('/:id', authenticateToken, validateId, async (req, res) => {
  try {
    const donationId = req.params.id;

    // Check if donation exists and belongs to user
    const [donationRows] = await promisePool.execute(
      'SELECT * FROM donations WHERE id = ? AND donor_id = ?',
      [donationId, req.user.id]
    );

    if (donationRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found or access denied'
      });
    }

    const donation = donationRows[0];

    // Only allow deleting scheduled donations
    if (donation.status !== 'scheduled') {
      return res.status(400).json({
        success: false,
        message: 'Can only delete scheduled donations'
      });
    }

    // Delete the donation
    await promisePool.execute('DELETE FROM donations WHERE id = ?', [donationId]);

    res.json({
      success: true,
      message: 'Donation deleted successfully'
    });

  } catch (error) {
    console.error('Delete donation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete donation',
      error: error.message
    });
  }
});

// @route   GET /api/donations/stats/donor
// @desc    Get donation statistics for current donor
// @access  Private (donors only)
router.get('/stats/donor', authenticateToken, requireRole('donor'), async (req, res) => {
  try {
    const [stats] = await promisePool.execute(`
      SELECT 
        COUNT(*) as total_donations,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_donations,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled_donations,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_donations,
        SUM(units_donated) as total_units_donated,
        MAX(donation_date) as last_donation_date
      FROM donations 
      WHERE donor_id = ?
    `, [req.user.id]);

    res.json({
      success: true,
      message: 'Donor statistics retrieved successfully',
      data: {
        stats: stats[0]
      }
    });

  } catch (error) {
    console.error('Get donor stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get donor statistics',
      error: error.message
    });
  }
});

module.exports = router; 
const express = require('express');
const User = require('../models/User');
const { authenticateToken, requireRole, optionalAuth } = require('../middleware/auth');
const { validateId, validatePagination, validateBloodGroupFilter } = require('../middleware/validation');

const router = express.Router();

// @route   GET /api/users/donors
// @desc    Get list of donors (optionally filtered by blood group)
// @access  Public (with optional auth for better results)
router.get('/donors', optionalAuth, validatePagination, validateBloodGroupFilter, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const blood_group = req.query.blood_group;

    let donors;
    
    if (blood_group) {
      donors = await User.findDonorsByBloodGroup(blood_group, limit, offset);
    } else {
      // Get all verified donors
      const { promisePool } = require('../config/database');
      const query = `
        SELECT * FROM users 
        WHERE user_type = 'individual' 
        AND role = 'donor' 
        AND verified = TRUE
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `;
      const [rows] = await promisePool.execute(query, [limit, offset]);
      donors = rows.map(row => new User(row));
    }

    // Remove sensitive information from response
    const safeDonors = donors.map(donor => ({
      id: donor.id,
      name: donor.name,
      blood_group: donor.blood_group,
      address: donor.address,
      created_at: donor.created_at
    }));

    res.json({
      success: true,
      message: 'Donors retrieved successfully',
      data: {
        donors: safeDonors,
        pagination: {
          page,
          limit,
          total: safeDonors.length
        }
      }
    });

  } catch (error) {
    console.error('Get donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get donors',
      error: error.message
    });
  }
});

// @route   GET /api/users/hospitals
// @desc    Get list of hospitals
// @access  Public
router.get('/hospitals', validatePagination, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const hospitals = await User.findHospitals(limit, offset);

    // Remove sensitive information from response
    const safeHospitals = hospitals.map(hospital => ({
      id: hospital.id,
      hospital_name: hospital.hospital_name,
      hospital_id: hospital.hospital_id,
      address: hospital.address,
      phone_number: hospital.phone_number,
      created_at: hospital.created_at
    }));

    res.json({
      success: true,
      message: 'Hospitals retrieved successfully',
      data: {
        hospitals: safeHospitals,
        pagination: {
          page,
          limit,
          total: safeHospitals.length
        }
      }
    });

  } catch (error) {
    console.error('Get hospitals error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get hospitals',
      error: error.message
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user profile by ID
// @access  Public (limited info) / Private (full info if own profile)
router.get('/:id', optionalAuth, validateId, async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if requesting own profile
    const isOwnProfile = req.user && req.user.id === userId;

    let userData;
    if (isOwnProfile) {
      // Return full profile data for own profile
      const stats = await user.getStats();
      userData = {
        user: user.toSafeObject(),
        stats
      };
    } else {
      // Return limited public profile data
      if (user.user_type === 'individual') {
        userData = {
          id: user.id,
          name: user.name,
          user_type: user.user_type,
          role: user.role,
          blood_group: user.blood_group,
          address: user.address,
          created_at: user.created_at
        };
      } else {
        userData = {
          id: user.id,
          hospital_name: user.hospital_name,
          hospital_id: user.hospital_id,
          user_type: user.user_type,
          address: user.address,
          phone_number: user.phone_number,
          created_at: user.created_at
        };
      }
    }

    res.json({
      success: true,
      message: 'User profile retrieved successfully',
      data: userData
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: error.message
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const allowedFields = [
      'name', 'hospital_name', 'hospital_id', 'phone_number', 'email', 'address', 
      'blood_group', 'date_of_birth', 'gender', 'weight', 'medications', 
      'last_donation', 'availability', 'max_distance', 'smoker', 'chronic_diseases'
    ];
    const updateData = {};

    // Only allow updating specific fields
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    // Validate blood group if provided
    if (updateData.blood_group) {
      const validBloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
      if (!validBloodGroups.includes(updateData.blood_group)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid blood group'
        });
      }
    }

    // Validate gender if provided
    if (updateData.gender) {
      const validGenders = ['male', 'female', 'other'];
      if (!validGenders.includes(updateData.gender.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid gender. Must be male, female, or other'
        });
      }
      updateData.gender = updateData.gender.toLowerCase();
    }

    // Validate email format if provided
    if (updateData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }
    }

    // Validate weight if provided
    if (updateData.weight !== undefined) {
      const weight = parseInt(updateData.weight);
      if (isNaN(weight) || weight < 30 || weight > 300) {
        return res.status(400).json({
          success: false,
          message: 'Weight must be a number between 30 and 300 kg'
        });
      }
      updateData.weight = weight;
    }

    // Validate availability if provided
    if (updateData.availability) {
      const validAvailability = ['available', 'unavailable', 'emergency'];
      if (!validAvailability.includes(updateData.availability)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid availability status'
        });
      }
    }

    // Validate max_distance if provided
    if (updateData.max_distance) {
      const validDistances = ['5', '10', '20', '50', 'any'];
      if (!validDistances.includes(updateData.max_distance)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid maximum distance'
        });
      }
    }

    // Validate date fields if provided
    if (updateData.date_of_birth) {
      const date = new Date(updateData.date_of_birth);
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date of birth format'
        });
      }
      // Check if user is at least 16 years old
      const minAge = new Date();
      minAge.setFullYear(minAge.getFullYear() - 16);
      if (date > minAge) {
        return res.status(400).json({
          success: false,
          message: 'User must be at least 16 years old'
        });
      }
    }

    if (updateData.last_donation) {
      const date = new Date(updateData.last_donation);
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Invalid last donation date format'
        });
      }
    }

    // Convert boolean strings to boolean
    if (updateData.smoker !== undefined) {
      updateData.smoker = updateData.smoker === true || updateData.smoker === 'true';
    }
    if (updateData.chronic_diseases !== undefined) {
      updateData.chronic_diseases = updateData.chronic_diseases === true || updateData.chronic_diseases === 'true';
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    const updatedUser = await req.user.update(updateData);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: updatedUser.toSafeObject()
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message
    });
  }
});

// @route   GET /api/users/search/donors
// @desc    Search donors by blood group and location
// @access  Private (for seekers and hospitals)
router.get('/search/donors', authenticateToken, validateBloodGroupFilter, async (req, res) => {
  try {
    const { blood_group, location } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    if (!blood_group) {
      return res.status(400).json({
        success: false,
        message: 'Blood group is required for donor search'
      });
    }

    let query = `
      SELECT * FROM users 
      WHERE user_type = 'individual' 
      AND role = 'donor' 
      AND blood_group = ? 
      AND verified = TRUE
    `;
    
    const queryParams = [blood_group];

    // Add location filter if provided
    if (location) {
      query += ` AND address LIKE ?`;
      queryParams.push(`%${location}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const { promisePool } = require('../config/database');
    const [rows] = await promisePool.execute(query, queryParams);
    const donors = rows.map(row => new User(row));

    // Return relevant donor information
    const donorData = donors.map(donor => ({
      id: donor.id,
      name: donor.name,
      blood_group: donor.blood_group,
      address: donor.address,
      phone_number: donor.phone_number, // Include for contact
      created_at: donor.created_at
    }));

    res.json({
      success: true,
      message: 'Donor search completed successfully',
      data: {
        donors: donorData,
        filters: {
          blood_group,
          location
        },
        pagination: {
          page,
          limit,
          total: donorData.length
        }
      }
    });

  } catch (error) {
    console.error('Search donors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search donors',
      error: error.message
    });
  }
});

// @route   GET /api/users/stats/overview
// @desc    Get platform statistics
// @access  Public
router.get('/stats/overview', async (req, res) => {
  try {
    const { promisePool } = require('../config/database');

    // Get basic platform statistics
    const [userStats] = await promisePool.execute(`
      SELECT 
        COUNT(*) as total_users,
        SUM(CASE WHEN user_type = 'individual' AND role = 'donor' THEN 1 ELSE 0 END) as total_donors,
        SUM(CASE WHEN user_type = 'individual' AND role = 'seeker' THEN 1 ELSE 0 END) as total_seekers,
        SUM(CASE WHEN user_type = 'hospital' THEN 1 ELSE 0 END) as total_hospitals,
        SUM(CASE WHEN verified = TRUE THEN 1 ELSE 0 END) as verified_users
      FROM users
    `);

    const [requestStats] = await promisePool.execute(`
      SELECT 
        COUNT(*) as total_requests,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_requests,
        SUM(CASE WHEN status = 'fulfilled' THEN 1 ELSE 0 END) as fulfilled_requests
      FROM blood_requests
    `);

    const [donationStats] = await promisePool.execute(`
      SELECT 
        COUNT(*) as total_donations,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_donations,
        SUM(units_donated) as total_units_donated
      FROM donations
    `);

    res.json({
      success: true,
      message: 'Platform statistics retrieved successfully',
      data: {
        users: userStats[0],
        requests: requestStats[0],
        donations: donationStats[0]
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get platform statistics',
      error: error.message
    });
  }
});

module.exports = router; 
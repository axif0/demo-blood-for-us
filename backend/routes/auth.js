const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validateUserRegistration, validateUserLogin } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateUserRegistration, async (req, res) => {
  try {
    const {
      name,
      hospital_name,
      hospital_id,
      phone_number,
      user_type,
      role,
      blood_group,
      address,
      password
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findByPhoneNumber(phone_number);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this phone number already exists'
      });
    }

    // Create new user
    const userData = {
      name,
      hospital_name,
      hospital_id,
      phone_number,
      user_type,
      role,
      blood_group,
      address,
      password
    };

    const newUser = await User.create(userData);

    // Generate token
    const token = generateToken(newUser.id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: newUser.toSafeObject(),
        token
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateUserLogin, async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    // Find user by phone number
    const user = await User.findByPhoneNumber(phone_number);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid phone number or password'
      });
    }

    // Verify password (if provided and user has password)
    if (password) {
      if (!user.password_hash) {
        return res.status(401).json({
          success: false,
          message: 'Password authentication not set up for this account'
        });
      }

      const isPasswordValid = await user.verifyPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid phone number or password'
        });
      }
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toSafeObject(),
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
});

// @route   POST /api/auth/login-otp
// @desc    Login with OTP (phone verification)
// @access  Public
router.post('/login-otp', async (req, res) => {
  try {
    const { phone_number, otp } = req.body;

    if (!phone_number || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required'
      });
    }

    // Find user by phone number
    const user = await User.findByPhoneNumber(phone_number);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // TODO: Verify OTP with SMS service
    // For now, we'll accept any 6-digit OTP starting with '1'
    if (!/^1\d{5}$/.test(otp)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid OTP'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      success: true,
      message: 'OTP verification successful',
      data: {
        user: user.toSafeObject(),
        token
      }
    });

  } catch (error) {
    console.error('OTP login error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed',
      error: error.message
    });
  }
});

// @route   POST /api/auth/send-otp
// @desc    Send OTP to phone number
// @access  Public
router.post('/send-otp', async (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    // TODO: Integrate with SMS service to send actual OTP
    // For now, we'll simulate sending OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log(`OTP for ${phone_number}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        phone_number,
        // Show OTP for testing (remove this when SMS service is ready)
        otp: otp
      }
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
      error: error.message
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const userStats = await req.user.getStats();
    
    res.json({
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        user: req.user.toSafeObject(),
        stats: userStats
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user profile',
      error: error.message
    });
  }
});

// @route   POST /api/auth/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', authenticateToken, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (new_password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Verify current password
    if (req.user.password_hash) {
      const isCurrentPasswordValid = await req.user.verifyPassword(current_password);
      if (!isCurrentPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }
    }

    // Update password
    await req.user.updatePassword(new_password);

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error.message
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (invalidate token)
// @access  Private
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // TODO: Add token to blacklist or remove from user_sessions table
    // For now, we'll just send success response
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
});

module.exports = router; 
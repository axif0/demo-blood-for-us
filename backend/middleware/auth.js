const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token is required'
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token - user not found'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Token verification failed'
      });
    }
  }
};

// Middleware to check if user is verified
const requireVerified = (req, res, next) => {
  if (!req.user.verified) {
    return res.status(403).json({
      success: false,
      message: 'Account verification required'
    });
  }
  next();
};

// Middleware to check user type
const requireUserType = (userType) => {
  return (req, res, next) => {
    if (req.user.user_type !== userType) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${userType} account required.`
      });
    }
    next();
  };
};

// Middleware to check user role (for individual users)
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.user_type !== 'individual') {
      return res.status(403).json({
        success: false,
        message: 'This endpoint is for individual users only'
      });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${role} role required.`
      });
    }
    next();
  };
};

// Middleware to allow access for specific user types/roles
const allowUserTypes = (allowedTypes) => {
  return (req, res, next) => {
    const userKey = req.user.user_type === 'individual' 
      ? `${req.user.user_type}_${req.user.role}`
      : req.user.user_type;
    
    if (!allowedTypes.includes(userKey)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied for your account type'
      });
    }
    next();
  };
};

// Optional authentication - doesn't fail if no token provided
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (user) {
        req.user = user;
      }
    }
    
    next();
  } catch (error) {
    // Ignore token errors for optional auth
    next();
  }
};

module.exports = {
  authenticateToken,
  requireVerified,
  requireUserType,
  requireRole,
  allowUserTypes,
  optionalAuth
}; 
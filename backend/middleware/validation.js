const { body, param, query, validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('phone_number')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('user_type')
    .isIn(['individual', 'hospital'])
    .withMessage('User type must be either individual or hospital'),
  
  // Individual user validations
  body('name')
    .if(body('user_type').equals('individual'))
    .notEmpty()
    .withMessage('Name is required for individual users')
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  
  body('role')
    .if(body('user_type').equals('individual'))
    .isIn(['donor', 'seeker'])
    .withMessage('Role must be either donor or seeker for individual users'),
  
  body('blood_group')
    .if(body('role').equals('donor'))
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Please provide a valid blood group'),
  
  // Hospital user validations
  body('hospital_name')
    .if(body('user_type').equals('hospital'))
    .notEmpty()
    .withMessage('Hospital name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Hospital name must be between 2 and 255 characters'),
  
  body('hospital_id')
    .if(body('user_type').equals('hospital'))
    .notEmpty()
    .withMessage('Hospital registration ID is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Hospital ID must be between 1 and 255 characters'),
  
  // Optional fields
  body('address')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Address must not exceed 1000 characters'),
  
  handleValidationErrors
];

// User login validation
const validateUserLogin = [
  body('phone_number')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  
  body('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  handleValidationErrors
];

// Blood request validation
const validateBloodRequest = [
  body('patient_name')
    .notEmpty()
    .withMessage('Patient name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Patient name must be between 2 and 255 characters'),
  
  body('blood_group')
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Please provide a valid blood group'),
  
  body('units_needed')
    .isInt({ min: 1, max: 20 })
    .withMessage('Units needed must be between 1 and 20'),
  
  body('urgency')
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Urgency must be low, medium, high, or critical'),
  
  body('hospital_name')
    .notEmpty()
    .withMessage('Hospital name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Hospital name must be between 2 and 255 characters'),
  
  body('hospital_address')
    .notEmpty()
    .withMessage('Hospital address is required')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Hospital address must be between 5 and 1000 characters'),
  
  body('contact_number')
    .isMobilePhone()
    .withMessage('Please provide a valid contact number'),
  
  body('required_by')
    .isISO8601()
    .withMessage('Please provide a valid date and time')
    .custom((value) => {
      const requiredDate = new Date(value);
      const now = new Date();
      if (requiredDate <= now) {
        throw new Error('Required date must be in the future');
      }
      return true;
    }),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  
  handleValidationErrors
];

// Donation validation
const validateDonation = [
  body('request_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Request ID must be a positive integer'),
  
  body('hospital_name')
    .notEmpty()
    .withMessage('Hospital name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Hospital name must be between 2 and 255 characters'),
  
  body('donation_date')
    .isISO8601()
    .withMessage('Please provide a valid donation date and time')
    .custom((value) => {
      const donationDate = new Date(value);
      const now = new Date();
      const maxFutureDate = new Date();
      maxFutureDate.setDate(now.getDate() + 90); // Max 90 days in future
      
      if (donationDate < now) {
        throw new Error('Donation date cannot be in the past');
      }
      if (donationDate > maxFutureDate) {
        throw new Error('Donation date cannot be more than 90 days in the future');
      }
      return true;
    }),
  
  body('units_donated')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Units donated must be between 1 and 5'),
  
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Notes must not exceed 500 characters'),
  
  handleValidationErrors
];

// ID parameter validation
const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),
  
  handleValidationErrors
];

// Pagination validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];

// Blood group filter validation
const validateBloodGroupFilter = [
  query('blood_group')
    .optional()
    .isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .withMessage('Please provide a valid blood group'),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateBloodRequest,
  validateDonation,
  validateId,
  validatePagination,
  validateBloodGroupFilter
}; 
const { promisePool } = require('../config/database');

const createTables = async () => {
  try {
    console.log('🚀 Starting database migration...');

    // Create users table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        hospital_name VARCHAR(255),
        hospital_id VARCHAR(255),
        phone_number VARCHAR(20) NOT NULL UNIQUE,
        user_type ENUM('individual', 'hospital') NOT NULL,
        role ENUM('donor', 'seeker') NULL,
        blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NULL,
        address TEXT,
        verified BOOLEAN DEFAULT FALSE,
        password_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        INDEX idx_user_type (user_type),
        INDEX idx_blood_group (blood_group),
        INDEX idx_role (role),
        INDEX idx_verified (verified)
      )
    `);

    // Create blood_requests table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS blood_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        requester_id INT NOT NULL,
        patient_name VARCHAR(255) NOT NULL,
        blood_group ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-') NOT NULL,
        units_needed INT NOT NULL DEFAULT 1,
        urgency ENUM('low', 'medium', 'high', 'critical') NOT NULL DEFAULT 'medium',
        hospital_name VARCHAR(255) NOT NULL,
        hospital_address TEXT NOT NULL,
        contact_number VARCHAR(20) NOT NULL,
        description TEXT,
        status ENUM('active', 'fulfilled', 'cancelled', 'expired') NOT NULL DEFAULT 'active',
        required_by DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_blood_group (blood_group),
        INDEX idx_status (status),
        INDEX idx_urgency (urgency),
        INDEX idx_required_by (required_by)
      )
    `);

    // Create donations table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS donations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        donor_id INT NOT NULL,
        request_id INT,
        hospital_name VARCHAR(255) NOT NULL,
        donation_date DATETIME NOT NULL,
        units_donated INT NOT NULL DEFAULT 1,
        status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (request_id) REFERENCES blood_requests(id) ON DELETE SET NULL,
        INDEX idx_donor_id (donor_id),
        INDEX idx_donation_date (donation_date),
        INDEX idx_status (status)
      )
    `);

    // Create notifications table
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        type ENUM('donation_request', 'donation_confirmed', 'request_fulfilled', 'general') NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        related_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_is_read (is_read),
        INDEX idx_type (type)
      )
    `);

    // Create user_sessions table for JWT token management
    await promisePool.execute(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token_hash VARCHAR(255) NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_expires_at (expires_at)
      )
    `);

    console.log('✅ Database migration completed successfully!');
    console.log('📊 Created tables: users, blood_requests, donations, notifications, user_sessions');
    
  } catch (error) {
    console.error('❌ Database migration failed:', error.message);
    throw error;
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  createTables()
    .then(() => {
      console.log('🎉 Migration script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { createTables }; 
const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blood_for_us'
};

async function createRequestAcceptancesTable() {
  let connection;
  
  try {
    connection = await mysql.createConnection(config);
    console.log('Connected to database');

    // Create request_acceptances table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS request_acceptances (
        id INT AUTO_INCREMENT PRIMARY KEY,
        request_id INT NOT NULL,
        donor_id INT NOT NULL,
        status ENUM('accepted', 'cancelled', 'completed') DEFAULT 'accepted',
        accepted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        notes TEXT,
        FOREIGN KEY (request_id) REFERENCES blood_requests(id) ON DELETE CASCADE,
        FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_request_donor (request_id, donor_id),
        INDEX idx_donor_id (donor_id),
        INDEX idx_request_id (request_id),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;

    await connection.execute(createTableQuery);
    console.log('✅ request_acceptances table created successfully');

    // Also add a status column to blood_requests if it doesn't exist
    try {
      await connection.execute(`
        ALTER TABLE blood_requests 
        ADD COLUMN status ENUM('draft', 'active', 'fulfilled', 'cancelled', 'expired') DEFAULT 'active'
      `);
      console.log('✅ Added status column to blood_requests table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        console.log('ℹ️  status column already exists in blood_requests table');
      } else {
        throw error;
      }
    }

    // Update existing blood_requests to have active status if they don't have one
    await connection.execute(`
      UPDATE blood_requests 
      SET status = 'active' 
      WHERE status IS NULL OR status = ''
    `);
    console.log('✅ Updated existing blood_requests with active status');

    console.log('\n🎉 Migration completed successfully!');
    console.log('📊 Request acceptances table is ready for tracking donor acceptances');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('📝 Database connection closed');
    }
  }
}

// Run migration if called directly
if (require.main === module) {
  createRequestAcceptancesTable();
}

module.exports = { createRequestAcceptancesTable }; 
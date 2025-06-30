const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blood_for_us',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Remove deprecated options that cause warnings
  acquireTimeout: 60000,
  idleTimeout: 600000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Create promise-based pool for async/await usage
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

// Initialize database connection test
testConnection();

module.exports = {
  pool,
  promisePool
}; 
const { promisePool } = require('../config/database');

const addProfileFields = async () => {
  try {
    console.log('🚀 Starting profile fields migration...');

    // Define the columns to add
    const columnsToAdd = [
      'email VARCHAR(255) NULL',
      'date_of_birth DATE NULL',
      'gender ENUM("male", "female", "other") NULL',
      'weight INT NULL',
      'medications TEXT NULL',
      'last_donation DATE NULL',
      'availability ENUM("available", "unavailable", "emergency") DEFAULT "available"',
      'max_distance ENUM("5", "10", "20", "50", "any") DEFAULT "10"',
      'smoker BOOLEAN DEFAULT FALSE',
      'chronic_diseases BOOLEAN DEFAULT FALSE'
    ];

    // Add each column individually with error handling
    for (const column of columnsToAdd) {
      const columnName = column.split(' ')[0];
      try {
        await promisePool.execute(`ALTER TABLE users ADD COLUMN ${column}`);
        console.log(`✅ Added column: ${columnName}`);
      } catch (error) {
        if (error.message.includes('Duplicate column name')) {
          console.log(`⚠️  Column ${columnName} already exists, skipping...`);
        } else {
          console.error(`❌ Error adding column ${columnName}:`, error.message);
          throw error;
        }
      }
    }

    // Add indexes with error handling
    const indexesToAdd = [
      'ADD INDEX idx_email (email)',
      'ADD INDEX idx_availability (availability)',
      'ADD INDEX idx_gender (gender)'
    ];

    for (const index of indexesToAdd) {
      try {
        await promisePool.execute(`ALTER TABLE users ${index}`);
        console.log(`✅ Added index: ${index}`);
      } catch (error) {
        if (error.message.includes('Duplicate key name')) {
          console.log(`⚠️  Index already exists, skipping...`);
        } else {
          console.error(`❌ Error adding index:`, error.message);
          // Don't throw for index errors, continue
        }
      }
    }

    console.log('✅ Profile fields migration completed successfully!');
    console.log('📊 Migration finished for columns: email, date_of_birth, gender, weight, medications, last_donation, availability, max_distance, smoker, chronic_diseases');
    
  } catch (error) {
    console.error('❌ Profile fields migration failed:', error.message);
    throw error;
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  addProfileFields()
    .then(() => {
      console.log('🎉 Profile fields migration script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Profile fields migration script failed:', error);
      process.exit(1);
    });
}

module.exports = { addProfileFields }; 
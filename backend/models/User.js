const { promisePool } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.hospital_name = userData.hospital_name;
    this.hospital_id = userData.hospital_id;
    this.phone_number = userData.phone_number;
    this.user_type = userData.user_type;
    this.role = userData.role;
    this.blood_group = userData.blood_group;
    this.address = userData.address;
    this.email = userData.email;
    this.date_of_birth = userData.date_of_birth;
    this.gender = userData.gender;
    this.weight = userData.weight;
    this.medications = userData.medications;
    this.last_donation = userData.last_donation;
    this.availability = userData.availability;
    this.max_distance = userData.max_distance;
    this.smoker = userData.smoker;
    this.chronic_diseases = userData.chronic_diseases;
    this.verified = userData.verified;
    this.password_hash = userData.password_hash;
    this.created_at = userData.created_at;
    this.updated_at = userData.updated_at;
  }

  // Create a new user
  static async create(userData) {
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
    } = userData;

    // Hash password if provided
    let password_hash = null;
    if (password) {
      password_hash = await bcrypt.hash(password, 12);
    }

    const query = `
      INSERT INTO users (
        name, hospital_name, hospital_id, phone_number, 
        user_type, role, blood_group, address, password_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name || null,
      hospital_name || null,
      hospital_id || null,
      phone_number,
      user_type,
      role || null,
      blood_group || null,
      address || null,
      password_hash
    ];

    try {
      const [result] = await promisePool.execute(query, values);
      const newUser = await User.findById(result.insertId);
      return newUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    try {
      const [rows] = await promisePool.execute(query, [id]);
      if (rows.length === 0) return null;
      return new User(rows[0]);
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }

  // Find user by phone number
  static async findByPhoneNumber(phone_number) {
    const query = 'SELECT * FROM users WHERE phone_number = ?';
    try {
      const [rows] = await promisePool.execute(query, [phone_number]);
      if (rows.length === 0) return null;
      return new User(rows[0]);
    } catch (error) {
      throw new Error(`Failed to find user: ${error.message}`);
    }
  }

  // Find all donors by blood group
  static async findDonorsByBloodGroup(blood_group, limit = 50, offset = 0) {
    const query = `
      SELECT * FROM users 
      WHERE user_type = 'individual' 
      AND role = 'donor' 
      AND blood_group = ? 
      AND verified = TRUE
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `;
    try {
      const [rows] = await promisePool.execute(query, [blood_group, limit, offset]);
      return rows.map(row => new User(row));
    } catch (error) {
      throw new Error(`Failed to find donors: ${error.message}`);
    }
  }

  // Find all hospitals
  static async findHospitals(limit = 50, offset = 0) {
    const query = `
      SELECT * FROM users 
      WHERE user_type = 'hospital' 
      AND verified = TRUE
      ORDER BY hospital_name ASC
      LIMIT ? OFFSET ?
    `;
    try {
      const [rows] = await promisePool.execute(query, [limit, offset]);
      return rows.map(row => new User(row));
    } catch (error) {
      throw new Error(`Failed to find hospitals: ${error.message}`);
    }
  }

  // Update user
  async update(updateData) {
    const allowedFields = [
      'name', 'hospital_name', 'hospital_id', 'phone_number', 'email',
      'role', 'blood_group', 'address', 'verified', 'date_of_birth', 'gender', 
      'weight', 'medications', 'last_donation', 'availability', 'max_distance', 
      'smoker', 'chronic_diseases'
    ];
    
    const updates = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updateData)) {
      if (allowedFields.includes(key) && value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    }
    
    if (updates.length === 0) {
      throw new Error('No valid fields to update');
    }
    
    values.push(this.id);
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    
    try {
      await promisePool.execute(query, values);
      
      // Refresh the instance with updated data
      const updatedUser = await User.findById(this.id);
      Object.assign(this, updatedUser);
      
      return this;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  // Update password
  async updatePassword(newPassword) {
    const password_hash = await bcrypt.hash(newPassword, 12);
    const query = 'UPDATE users SET password_hash = ? WHERE id = ?';
    
    try {
      await promisePool.execute(query, [password_hash, this.id]);
      this.password_hash = password_hash;
      return this;
    } catch (error) {
      throw new Error(`Failed to update password: ${error.message}`);
    }
  }

  // Verify password
  async verifyPassword(password) {
    if (!this.password_hash) return false;
    return await bcrypt.compare(password, this.password_hash);
  }

  // Delete user
  async delete() {
    const query = 'DELETE FROM users WHERE id = ?';
    try {
      await promisePool.execute(query, [this.id]);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  // Get safe user data (without password hash)
  toSafeObject() {
    const { password_hash, ...safeUser } = this;
    return safeUser;
  }

  // Get user statistics (for dashboard)
  async getStats() {
    try {
      const stats = {
        totalDonations: 0,
        totalRequests: 0,
        completedDonations: 0,
        fulfilledRequests: 0
      };

      if (this.user_type === 'individual' && this.role === 'donor') {
        // Get donation stats
        const [donationRows] = await promisePool.execute(
          'SELECT COUNT(*) as total, SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed FROM donations WHERE donor_id = ?',
          [this.id]
        );
        stats.totalDonations = donationRows[0].total;
        stats.completedDonations = donationRows[0].completed;
      }

      if (this.user_type === 'individual' && this.role === 'seeker') {
        // Get request stats
        const [requestRows] = await promisePool.execute(
          'SELECT COUNT(*) as total, SUM(CASE WHEN status = "fulfilled" THEN 1 ELSE 0 END) as fulfilled FROM blood_requests WHERE requester_id = ?',
          [this.id]
        );
        stats.totalRequests = requestRows[0].total;
        stats.fulfilledRequests = requestRows[0].fulfilled;
      }

      if (this.user_type === 'hospital') {
        // Get hospital stats
        const [requestRows] = await promisePool.execute(
          'SELECT COUNT(*) as total, SUM(CASE WHEN status = "fulfilled" THEN 1 ELSE 0 END) as fulfilled FROM blood_requests WHERE requester_id = ?',
          [this.id]
        );
        const [donationRows] = await promisePool.execute(
          'SELECT COUNT(*) as total FROM donations WHERE hospital_name = ?',
          [this.hospital_name]
        );
        stats.totalRequests = requestRows[0].total;
        stats.fulfilledRequests = requestRows[0].fulfilled;
        stats.totalDonations = donationRows[0].total;
      }

      return stats;
    } catch (error) {
      throw new Error(`Failed to get user stats: ${error.message}`);
    }
  }
}

module.exports = User; 
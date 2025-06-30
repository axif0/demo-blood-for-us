# Blood For Us - Backend API

A comprehensive backend API for a blood donation platform built with Node.js, Express, and MySQL.

## 🚀 Features

- **User Management**: Support for 3 user types (Individual Donors, Individual Seekers, Hospitals)
- **Authentication**: JWT-based authentication with OTP support
- **Blood Requests**: Create and manage blood donation requests
- **Donation Scheduling**: Schedule and track blood donations
- **Search & Filtering**: Find donors by blood group and location
- **Statistics**: Comprehensive stats for users and platform
- **Security**: Input validation, rate limiting, and security headers

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or pnpm

## 🛠️ Installation

1. **Clone the repository and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

   ```
   DROP USER IF EXISTS blood_user'@'localhost';
    CREATE USER 'blood_user'@'localhost' IDENTIFIED BY 'blood_password_123';
    GRANT ALL PRIVILEGES ON blood_for_us.* TO 'blood_user'@'localhost';
    FLUSH PRIVILEGES;
    SELECT User, Host FROM mysql.user WHERE User = 'blood_user';
    EXIT;

   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=blood_for_us

   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # CORS Configuration
   FRONTEND_URL=http://localhost:3000
   ```

4. **Database Setup**
   
   Create the MySQL database:
   ```sql
   CREATE DATABASE blood_for_us;
   ```

   Run migrations to create tables:
   ```bash
   npm run migrate
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "phone_number": "+8801234567890",
  "user_type": "individual", // or "hospital"
  "name": "John Doe", // for individual users
  "role": "donor", // "donor" or "seeker" for individual users
  "blood_group": "A+", // for donors
  "hospital_name": "City Hospital", // for hospital users
  "hospital_id": "HOSP123", // for hospital users
  "address": "123 Main St, City",
  "password": "optional_password"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "phone_number": "+8801234567890",
  "password": "password" // optional
}
```

#### OTP Login
```http
POST /auth/login-otp
Content-Type: application/json

{
  "phone_number": "+8801234567890",
  "otp": "123456"
}
```

#### Send OTP
```http
POST /auth/send-otp
Content-Type: application/json

{
  "phone_number": "+8801234567890"
}
```

### User Endpoints

#### Get Donors
```http
GET /users/donors?blood_group=A+&page=1&limit=20
```

#### Get Hospitals
```http
GET /users/hospitals?page=1&limit=20
```

#### Search Donors (Authenticated)
```http
GET /users/search/donors?blood_group=A+&location=Dhaka
Authorization: Bearer <token>
```

#### Update Profile (Authenticated)
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "address": "New Address"
}
```

### Blood Request Endpoints

#### Create Blood Request (Authenticated)
```http
POST /requests
Authorization: Bearer <token>
Content-Type: application/json

{
  "patient_name": "Jane Doe",
  "blood_group": "O+",
  "units_needed": 2,
  "urgency": "high",
  "hospital_name": "City Hospital",
  "hospital_address": "123 Hospital St",
  "contact_number": "+8801234567890",
  "required_by": "2024-12-31T23:59:59Z",
  "description": "Emergency surgery required"
}
```

#### Get All Blood Requests
```http
GET /requests?blood_group=O+&urgency=high&status=active&page=1&limit=20
```

#### Get User's Requests (Authenticated)
```http
GET /requests/user/mine
Authorization: Bearer <token>
```

### Donation Endpoints

#### Schedule Donation (Authenticated - Donors only)
```http
POST /donations
Authorization: Bearer <token>
Content-Type: application/json

{
  "request_id": 123, // optional
  "hospital_name": "City Hospital",
  "donation_date": "2024-12-25T10:00:00Z",
  "units_donated": 1,
  "notes": "First time donor"
}
```

#### Get User's Donations (Authenticated - Donors only)
```http
GET /donations/user/mine
Authorization: Bearer <token>
```

#### Update Donation Status (Authenticated)
```http
PATCH /donations/123/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed" // "scheduled", "completed", "cancelled"
}
```

## 🗄️ Database Schema

### Users Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR(255)) // Individual users
- hospital_name (VARCHAR(255)) // Hospital users
- hospital_id (VARCHAR(255)) // Hospital registration ID
- phone_number (VARCHAR(20), UNIQUE, NOT NULL)
- user_type (ENUM: 'individual', 'hospital')
- role (ENUM: 'donor', 'seeker') // For individual users
- blood_group (ENUM: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
- address (TEXT)
- verified (BOOLEAN, DEFAULT FALSE)
- password_hash (VARCHAR(255))
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Blood Requests Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- requester_id (INT, FOREIGN KEY)
- patient_name (VARCHAR(255), NOT NULL)
- blood_group (ENUM, NOT NULL)
- units_needed (INT, DEFAULT 1)
- urgency (ENUM: 'low', 'medium', 'high', 'critical')
- hospital_name (VARCHAR(255), NOT NULL)
- hospital_address (TEXT, NOT NULL)
- contact_number (VARCHAR(20), NOT NULL)
- description (TEXT)
- status (ENUM: 'active', 'fulfilled', 'cancelled', 'expired')
- required_by (DATETIME, NOT NULL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Donations Table
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- donor_id (INT, FOREIGN KEY)
- request_id (INT, FOREIGN KEY, NULLABLE)
- hospital_name (VARCHAR(255), NOT NULL)
- donation_date (DATETIME, NOT NULL)
- units_donated (INT, DEFAULT 1)
- status (ENUM: 'scheduled', 'completed', 'cancelled')
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🛡️ Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation using express-validator
- **Security Headers**: Helmet.js for security headers
- **Password Hashing**: bcryptjs for password security
- **CORS**: Configurable cross-origin resource sharing

## 📊 Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message" // Only in development
}
```

## 🔧 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run database migrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- OTP verification is currently simulated (accepts any 6-digit OTP starting with '1')
- SMS integration needs to be implemented for production
- Email notifications are not yet implemented

## 🚀 Future Enhancements

- SMS OTP integration
- Email notifications
- Real-time notifications using WebSockets
- Advanced search filters
- Blood bank inventory management
- Appointment scheduling system 
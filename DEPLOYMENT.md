# Deployment Guide

This guide covers deploying the Blood For Us application both locally and on the production server (31.97.142.243).

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v5.7 or higher)
- pnpm (recommended) or npm

## Environment Setup

### 1. Backend Environment Configuration

Copy the example environment file and configure it:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your configuration:

#### For Local Development:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_local_password
DB_NAME=blood_for_us

JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:3000
```

#### For Production (31.97.142.243):
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_production_password
DB_NAME=blood_for_us

JWT_SECRET=your_super_secure_production_jwt_key
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=production

FRONTEND_URL=http://31.97.142.243:3000
```

### 2. Frontend Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

#### For Local Development (.env.local):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Blood For Us
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### For Production (.env.production):
```env
NEXT_PUBLIC_API_URL=http://31.97.142.243:5000/api
NEXT_PUBLIC_APP_NAME=Blood For Us
NEXT_PUBLIC_APP_URL=http://31.97.142.243:3000
```

## Database Setup

### 1. Create Database

```sql
CREATE DATABASE blood_for_us;
```

### 2. Run Migrations

```bash
cd backend
npm run migrate
```

## Local Development

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
```

Backend will be available at: http://localhost:5000

### 2. Start Frontend

```bash
# From root directory
pnpm install
pnpm dev
```

Frontend will be available at: http://localhost:3000

## Production Deployment on 31.97.142.243

### 1. Server Setup

Connect to your server:
```bash
ssh root@31.97.142.243
```

### 2. Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install pnpm
npm install -g pnpm

# Install MySQL
apt install mysql-server -y
mysql_secure_installation
```

### 3. Clone and Setup Project

```bash
# Clone repository
git clone <your-repo-url> blood-for-us
cd blood-for-us

# Install dependencies
pnpm install

# Setup backend
cd backend
npm install
```

### 4. Configure Environment Files

Create production environment files as described above.

### 5. Setup Database

```bash
# Login to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE blood_for_us;
CREATE USER 'blood_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON blood_for_us.* TO 'blood_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Run migrations
npm run migrate
```

### 6. Build and Start Application

```bash
# Build frontend
cd ..  # Back to root
pnpm build

# Start backend (use PM2 for production)
cd backend
npm install -g pm2
pm2 start server.js --name "blood-for-us-backend"

# Start frontend
cd ..
pm2 start "pnpm start" --name "blood-for-us-frontend"

# Save PM2 configuration
pm2 save
pm2 startup
```

### 7. Configure Firewall

```bash
# Allow necessary ports
ufw allow 22      # SSH
ufw allow 3000    # Frontend
ufw allow 5000    # Backend API
ufw enable
```

## Access URLs

### Local Development:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

### Production:
- Frontend: http://31.97.142.243:3000
- Backend API: http://31.97.142.243:5000/api
- Health Check: http://31.97.142.243:5000/api/health

## Environment Variables Summary

| Variable | Local Development | Production |
|----------|------------------|------------|
| NEXT_PUBLIC_API_URL | http://localhost:5000/api | http://31.97.142.243:5000/api |
| NEXT_PUBLIC_APP_URL | http://localhost:3000 | http://31.97.142.243:3000 |
| FRONTEND_URL (Backend) | http://localhost:3000 | http://31.97.142.243:3000 |
| NODE_ENV | development | production |

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure:
1. Backend `.env` has correct `FRONTEND_URL`
2. Frontend environment files have correct API URLs
3. Server firewall allows the necessary ports

### Database Connection Issues
1. Check MySQL service is running: `systemctl status mysql`
2. Verify database credentials in `.env` file
3. Ensure database user has proper permissions

### Port Issues
1. Check if ports are available: `netstat -tulpn | grep :3000`
2. Kill processes if needed: `sudo kill -9 <PID>`
3. Restart services with PM2: `pm2 restart all`

## Production Monitoring

```bash
# View application logs
pm2 logs

# Monitor application status
pm2 status

# Restart applications
pm2 restart all

# Stop applications
pm2 stop all
``` 
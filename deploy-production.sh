#!/bin/bash

echo "🩸 Blood For Us - Production Deployment (31.97.142.243)"
echo "======================================================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run this script as root or with sudo"
    exit 1
fi

echo "🔄 Updating system packages..."
apt update && apt upgrade -y

echo "📦 Installing Node.js..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
fi

echo "📦 Installing pnpm..."
if ! command -v pnpm &> /dev/null; then
    npm install -g pnpm
fi

echo "📦 Installing PM2..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

echo "🗄️ Installing MySQL..."
if ! command -v mysql &> /dev/null; then
    apt install mysql-server -y
    echo "⚠️  Please run 'mysql_secure_installation' after this script completes"
fi

echo "🔧 Setting up environment files..."

# Frontend environment setup
if [ ! -f .env.production ]; then
    echo "🔧 Creating frontend .env.production..."
    cat > .env.production << EOF
# Next.js Frontend Production Configuration
NEXT_PUBLIC_API_URL=http://31.97.142.243:5000/api
NEXT_PUBLIC_APP_NAME=Blood For Us
NEXT_PUBLIC_APP_URL=http://31.97.142.243:3000
EOF
    echo "✅ Frontend production environment file created"
fi

# Backend environment setup
cd backend
if [ ! -f .env ]; then
    echo "🔧 Creating backend .env..."
    cat > .env << EOF
# Backend Production Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=blood_user
DB_PASSWORD=your_secure_production_password
DB_NAME=blood_for_us

JWT_SECRET=your_super_secure_production_jwt_key_here
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=production

FRONTEND_URL=http://31.97.142.243:3000
EOF
    echo "✅ Backend production environment file created"
    echo "⚠️  Please update the database password and JWT secret in backend/.env"
fi

cd ..

echo "📦 Installing dependencies..."

# Install frontend dependencies
echo "🔧 Installing frontend dependencies..."
pnpm install

# Install backend dependencies
echo "🔧 Installing backend dependencies..."
cd backend
npm install
cd ..

echo "🏗️ Building application..."
pnpm build

echo "🔥 Setting up firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 22      # SSH
    ufw allow 3000    # Frontend
    ufw allow 5000    # Backend API
    ufw --force enable
    echo "✅ Firewall configured"
fi

echo ""
echo "✅ Production setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update database credentials in backend/.env"
echo "2. Update JWT secret in backend/.env"
echo "3. Setup MySQL database:"
echo "   mysql -u root -p"
echo "   CREATE DATABASE blood_for_us;"
echo "   CREATE USER 'blood_user'@'localhost' IDENTIFIED BY 'your_secure_password';"
echo "   GRANT ALL PRIVILEGES ON blood_for_us.* TO 'blood_user'@'localhost';"
echo "   FLUSH PRIVILEGES;"
echo "   EXIT;"
echo "4. Run migrations: cd backend && npm run migrate"
echo "5. Start services:"
echo "   cd backend && pm2 start server.js --name 'blood-for-us-backend'"
echo "   cd .. && pm2 start 'pnpm start' --name 'blood-for-us-frontend'"
echo "   pm2 save && pm2 startup"
echo ""
echo "🌐 Production URLs:"
echo "   Frontend: http://31.97.142.243:3000"
echo "   Backend:  http://31.97.142.243:5000/api"
echo "   Health:   http://31.97.142.243:5000/api/health" 
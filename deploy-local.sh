#!/bin/bash

echo "🩸 Blood For Us - Local Development Setup"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "📋 Setting up environment files..."

# Frontend environment setup
if [ ! -f .env.local ]; then
    echo "🔧 Creating frontend .env.local..."
    cat > .env.local << EOF
# Next.js Frontend Local Development Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Blood For Us
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    echo "✅ Frontend environment file created"
else
    echo "ℹ️  Frontend .env.local already exists"
fi

# Backend environment setup
cd backend
if [ ! -f .env ]; then
    echo "🔧 Creating backend .env..."
    cat > .env << EOF
# Backend Local Development Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blood_for_us

JWT_SECRET=local_dev_jwt_secret_key_replace_in_production
JWT_EXPIRES_IN=7d

PORT=5000
NODE_ENV=development

FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ Backend environment file created"
    echo "⚠️  Please update the database password in backend/.env"
else
    echo "ℹ️  Backend .env already exists"
fi

cd ..

echo ""
echo "📦 Installing dependencies..."

# Install frontend dependencies
echo "🔧 Installing frontend dependencies..."
pnpm install

# Install backend dependencies
echo "🔧 Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update database password in backend/.env"
echo "2. Create MySQL database: CREATE DATABASE blood_for_us;"
echo "3. Run migrations: cd backend && npm run migrate"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Start frontend: pnpm dev"
echo ""
echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000/api"
echo "   Health:   http://localhost:5000/api/health" 
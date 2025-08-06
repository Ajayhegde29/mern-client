#!/bin/bash

echo "🚀 MERN Todo App Deployment Script"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Step 1: Commit all changes
echo ""
echo "📝 Step 1: Committing changes..."
git add .
git commit -m "Prepare for deployment: Update API configuration and add deployment docs"

# Step 2: Push to GitHub
echo ""
echo "📤 Step 2: Pushing to GitHub..."
git push origin master

echo ""
echo "🎉 Deployment preparation completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Backend (Render):"
echo "   - Go to https://render.com"
echo "   - Create a new Web Service"
echo "   - Connect your GitHub repository"
echo "   - Set Build Command: npm install"
echo "   - Set Start Command: npm start"
echo "   - Add environment variables:"
echo "     - MONGO_URI: your_mongodb_connection_string"
echo "     - JWT_SECRET: your_jwt_secret_key"
echo "     - NODE_ENV: production"
echo "     - CLIENT_URL: your_frontend_url"
echo ""
echo "2. Frontend (Vercel):"
echo "   - Go to https://vercel.com"
echo "   - Create a new project"
echo "   - Import your GitHub repository"
echo "   - Set Root Directory: client"
echo "   - Deploy!"
echo ""
echo "🔗 Your deployed URLs will be:"
echo "   - Backend: https://your-app-name.onrender.com"
echo "   - Frontend: https://your-app-name.vercel.app"
echo ""
echo "📚 For detailed instructions, see README.md" 
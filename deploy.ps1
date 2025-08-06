# MERN Todo App Deployment Script for Windows
Write-Host "🚀 MERN Todo App Deployment Script" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if node is installed
try {
    node --version | Out-Null
    Write-Host "✅ Node.js is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Prerequisites check passed!" -ForegroundColor Green

# Step 1: Commit all changes
Write-Host ""
Write-Host "📝 Step 1: Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "Prepare for deployment: Update API configuration and add deployment docs"

# Step 2: Push to GitHub
Write-Host ""
Write-Host "📤 Step 2: Pushing to GitHub..." -ForegroundColor Yellow
git push origin master

Write-Host ""
Write-Host "🎉 Deployment preparation completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Backend (Render):" -ForegroundColor White
Write-Host "   - Go to https://render.com" -ForegroundColor Gray
Write-Host "   - Create a new Web Service" -ForegroundColor Gray
Write-Host "   - Connect your GitHub repository" -ForegroundColor Gray
Write-Host "   - Set Build Command: npm install" -ForegroundColor Gray
Write-Host "   - Set Start Command: npm start" -ForegroundColor Gray
Write-Host "   - Add environment variables:" -ForegroundColor Gray
Write-Host "     - MONGO_URI: your_mongodb_connection_string" -ForegroundColor Gray
Write-Host "     - JWT_SECRET: your_jwt_secret_key" -ForegroundColor Gray
Write-Host "     - NODE_ENV: production" -ForegroundColor Gray
Write-Host "     - CLIENT_URL: your_frontend_url" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Frontend (Vercel):" -ForegroundColor White
Write-Host "   - Go to https://vercel.com" -ForegroundColor Gray
Write-Host "   - Create a new project" -ForegroundColor Gray
Write-Host "   - Import your GitHub repository" -ForegroundColor Gray
Write-Host "   - Set Root Directory: client" -ForegroundColor Gray
Write-Host "   - Deploy!" -ForegroundColor Gray
Write-Host ""
Write-Host "🔗 Your deployed URLs will be:" -ForegroundColor Cyan
Write-Host "   - Backend: https://your-app-name.onrender.com" -ForegroundColor Gray
Write-Host "   - Frontend: https://your-app-name.vercel.app" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 For detailed instructions, see README.md" -ForegroundColor Cyan 
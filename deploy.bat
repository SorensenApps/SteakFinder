@echo off
REM SteakFinder Cloudflare Pages Deployment Script for Windows
echo 🚀 Deploying SteakFinder to Cloudflare Pages...

REM Check if wrangler is installed
wrangler --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Wrangler CLI not found. Installing...
    npm install -g wrangler
)

REM Build the project
echo 📦 Building the project...
npm run build

REM Check if build was successful
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please fix the errors and try again.
    exit /b 1
)

REM Deploy to Cloudflare Pages
echo 🌐 Deploying to Cloudflare Pages...
wrangler pages deploy out

echo ✅ Deployment complete!
echo 🔗 Your app should be available at your Cloudflare Pages URL


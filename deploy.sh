#!/bin/bash

# SteakFinder Cloudflare Pages Deployment Script
echo "🚀 Deploying SteakFinder to Cloudflare Pages..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy to Cloudflare Pages
echo "🌐 Deploying to Cloudflare Pages..."
wrangler pages deploy out

echo "✅ Deployment complete!"
echo "🔗 Your app should be available at your Cloudflare Pages URL"


#!/bin/bash
# Script to switch between development and production environments

ENV=${1:-development}

if [ "$ENV" != "development" ] && [ "$ENV" != "production" ]; then
    echo "Usage: $0 [development|production]"
    echo "Defaults to development if no argument provided"
    exit 1
fi

echo "Switching to $ENV environment..."

# Copy environment files
cp .env.$ENV .env
cp apps/web/.env.$ENV apps/web/.env  
cp packages/db/.env.$ENV packages/db/.env

echo "✅ Environment switched to $ENV"
echo "📁 Updated .env files in:"
echo "   - Root directory"
echo "   - apps/web/"
echo "   - packages/db/"

if [ "$ENV" = "development" ]; then
    echo ""
    echo "🔧 Development environment active"
    echo "   - Using Neon development branch"
    echo "   - Local development server: http://localhost:3000"
else
    echo ""
    echo "🚀 Production environment active"
    echo "   - Using Neon main/production branch"
    echo "   - Ready for production deployment"
fi
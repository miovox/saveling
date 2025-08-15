#!/bin/bash
# Generate secure secrets for NextAuth

echo "🔐 NextAuth Secret Generation"
echo "============================="
echo ""

echo "Production NextAuth Secret (copy to Vercel):"
openssl rand -base64 32
echo ""

echo "Development NextAuth Secret (already set in .env.development):"
echo "your-secret-key-here (replace this with above for security)"
echo ""

echo "📋 Instructions:"
echo "1. Copy the production secret to Vercel environment variables"
echo "2. Set NEXTAUTH_SECRET in Vercel for both Production and Preview"
echo "3. Update local .env.development with new secret if needed"
#!/bin/bash

# E-Commerce Platform - Startup Script
# This script starts all services

echo "=============================================="
echo "🚀 E-Commerce Platform Startup"
echo "=============================================="
echo ""

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "📦 Docker detected. Starting with Docker Compose..."
    echo ""
    
    # Navigate to project root
    cd "$(dirname "$0")/.." || exit
    
    # Start services
    docker-compose up -d
    
    echo ""
    echo "⏳ Waiting for services to start..."
    sleep 10
    
    # Check service health
    echo ""
    echo "🔍 Checking service health..."
    
    # Check backend
    if curl -s http://localhost:8080/api/config/health > /dev/null; then
        echo "✅ Backend: Running at http://localhost:8080/api"
    else
        echo "⏳ Backend: Starting up..."
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ Frontend: Running at http://localhost:3000"
    else
        echo "⏳ Frontend: Starting up..."
    fi
    
    echo ""
    echo "=============================================="
    echo "📍 Access Points:"
    echo "=============================================="
    echo "Frontend:    http://localhost:3000"
    echo "Backend API: http://localhost:8080/api"
    echo "Swagger UI:  http://localhost:8080/api/swagger-ui.html"
    echo "Health:      http://localhost:8080/api/config/health"
    echo ""
    echo "💡 Use 'docker-compose logs -f' to view logs"
    echo "💡 Use 'docker-compose down' to stop services"
    
else
    echo "⚠️  Docker not detected. Please start services manually:"
    echo ""
    echo "1. Start Backend:"
    echo "   cd ecommerce-core-service"
    echo "   ./mvnw spring-boot:run"
    echo ""
    echo "2. Start Frontend:"
    echo "   cd ecommerce-frontend"
    echo "   npm install"
    echo "   npm run dev"
fi

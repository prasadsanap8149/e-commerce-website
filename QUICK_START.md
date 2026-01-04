# 🚀 Quick Start Guide

Get the E-Commerce Platform running in under 5 minutes!

## 📋 Prerequisites

Choose one of the following options:

### Option A: Docker (Recommended)

- Docker Desktop installed
- Docker Compose installed

### Option B: Manual Setup

- Java 17+
- Node.js 18+
- MySQL 8.0
- Maven 3.8+

---

## 🐳 Option A: Docker Setup (Recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/prasadsanap8149/e-commerce-website.git
cd e-commerce-website
```

### Step 2: Start All Services

```bash
docker-compose up -d
```

### Step 3: Wait for Services to Start

```bash
# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Step 4: Access the Application

| Service      | URL                                       |
| ------------ | ----------------------------------------- |
| Frontend     | http://localhost:3000                     |
| Backend API  | http://localhost:8080/api                 |
| Swagger UI   | http://localhost:8080/api/swagger-ui.html |
| Health Check | http://localhost:8080/api/config/health   |

### Stop Services

```bash
docker-compose down
```

### Stop and Remove Data

```bash
docker-compose down -v
```

---

## 🔧 Option B: Manual Setup

### Step 1: Setup MySQL Database

```bash
# Start MySQL and login
mysql -u root -p

# Create database
CREATE DATABASE ecommerce_db;

# Exit MySQL
exit
```

### Step 2: Start Backend Service

```bash
cd ecommerce-core-service

# Run with Maven
./mvnw spring-boot:run

# Or build and run JAR
./mvnw clean package -DskipTests
java -jar target/ecommerce-core-service-1.0.0.jar
```

Backend will be available at: http://localhost:8080/api

### Step 3: Start Frontend Service

```bash
cd ecommerce-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:3000

---

## ✅ Verify Installation

### 1. Check Backend Health

```bash
curl http://localhost:8080/api/config/health
```

Expected response:

```json
{
  "status": "UP",
  "service": "ecommerce-core-service",
  "version": "1.0.0"
}
```

### 2. Check Products API

```bash
curl http://localhost:8080/api/products
```

### 3. Open Swagger UI

Navigate to: http://localhost:8080/api/swagger-ui.html

### 4. Open Frontend

Navigate to: http://localhost:3000

---

## 🧪 Test the API

### Create a Product

```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "A test product",
    "price": 29.99,
    "categoryId": 1,
    "stock": 100
  }'
```

### Submit an Enquiry

```bash
curl -X POST http://localhost:8080/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "message": "I have a question about your products"
  }'
```

---

## 📁 Project URLs Summary

| Service     | Local URL                                 | Description          |
| ----------- | ----------------------------------------- | -------------------- |
| Frontend    | http://localhost:3000                     | React/Next.js UI     |
| Backend API | http://localhost:8080/api                 | Spring Boot REST API |
| Swagger UI  | http://localhost:8080/api/swagger-ui.html | API Documentation    |
| API Docs    | http://localhost:8080/api/v3/api-docs     | OpenAPI JSON         |
| Health      | http://localhost:8080/api/config/health   | Health Check         |
| Features    | http://localhost:8080/api/config/features | Feature Toggles      |
| MySQL       | localhost:3306                            | Database             |

---

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :8080
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Docker Issues

```bash
# Rebuild containers
docker-compose up -d --build

# Reset everything
docker-compose down -v
docker-compose up -d
```

### Database Connection Issues

```bash
# Check MySQL is running
docker-compose ps mysql

# View MySQL logs
docker-compose logs mysql
```

### Clear Docker Cache

```bash
docker system prune -a
```

---

## 📚 Next Steps

1. Read the [API Documentation](./docs/API_DOCUMENTATION.md)
2. Import the [Postman Collection](./docs/postman/E-Commerce-API.postman_collection.json)
3. Review the [cURL Commands](./docs/CURL_COMMANDS.md)
4. Check the [Project Overview](./PROJECT_OVERVIEW.md)

---

Happy coding! 🎉

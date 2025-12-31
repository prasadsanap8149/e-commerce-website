# 🚀 Quick Start Guide

## 5-Minute Setup with Docker

### Step 1: Prerequisites

- Install [Docker](https://www.docker.com/products/docker-desktop)
- Install [Docker Compose](https://docs.docker.com/compose/install/)

### Step 2: Start the Platform

```bash
cd e-commerce-website
docker-compose up -d
```

### Step 3: Access the Services

| Service  | URL                                       | Credentials        |
| -------- | ----------------------------------------- | ------------------ |
| Frontend | http://localhost:3000                     | -                  |
| API Docs | http://localhost:8080/api/swagger-ui.html | -                  |
| API Base | http://localhost:8080/api                 | -                  |
| Database | localhost:3306                            | root:root_password |

### Step 4: Test the APIs

```bash
# Get all products
curl http://localhost:8080/api/products

# Create an enquiry
curl -X POST http://localhost:8080/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "I am interested in this product"
  }'

# Check features
curl http://localhost:8080/api/config/features

# Health check
curl http://localhost:8080/api/config/health
```

---

## Manual Setup (Development)

### Backend Setup

```bash
cd ecommerce-core-service

# Build the project
mvn clean install

# Run the service
mvn spring-boot:run

# Or run the JAR
mvn clean package
java -jar target/ecommerce-core-service-1.0.0.jar
```

**Backend will run on**: `http://localhost:8080/api`

### Frontend Setup

```bash
cd ecommerce-frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Or build for production
npm run build
npm run start
```

**Frontend will run on**: `http://localhost:3000`

---

## Key Features

✅ **Product Management**

- List, search, and filter products
- Category-based browsing
- Product details with images

✅ **Enquiry System**

- Contact forms
- Enquiry tracking
- Status management

✅ **Feature Toggles**

- Enable/disable features via environment variables
- Toggle auth, payments, email, SMS
- Flexible architecture

✅ **API Documentation**

- Swagger/OpenAPI integration
- Interactive API explorer
- Try it out functionality

---

## Project Structure Overview

```
ecommerce-frontend/
├── components/    → Reusable React components
├── pages/         → Next.js pages
├── config/        → Feature toggles & API config
├── services/      → API client services
└── context/       → React Context providers

ecommerce-core-service/
├── controller/    → REST endpoints
├── service/       → Business logic
├── repository/    → Database queries
├── model/         → Database entities
├── dto/          → Data transfer objects
└── exception/    → Error handling
```

---

## Common Commands

### Docker

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild images
docker-compose build --no-cache
```

### Frontend

```bash
npm install              # Install dependencies
npm run dev              # Development mode
npm run build            # Production build
npm run start            # Start production server
npm test                 # Run tests
npm run lint             # Run linter
```

### Backend

```bash
mvn clean install        # Install dependencies
mvn spring-boot:run      # Development mode
mvn clean package        # Build JAR
mvn test                 # Run tests
```

---

## Database Configuration

### Docker (Default)

The MySQL database is automatically set up with:

- **Host**: localhost
- **Port**: 3306
- **Database**: ecommerce_db
- **Username**: ecommerce_user
- **Password**: ecommerce_pass

### Manual Setup

```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE ecommerce_db;

# Import schema
SOURCE ecommerce-core-service/database-schema.sql;
```

---

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_AUTH=true
NEXT_PUBLIC_PAYMENT=true
NEXT_PUBLIC_EMAIL=true
NEXT_PUBLIC_SMS=false
```

### Backend (application.yml)

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/ecommerce_db
    username: root
    password: root_password

feature:
  auth:
    enabled: true
  payment:
    enabled: true
  email:
    enabled: true
  sms:
    enabled: false
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 8080 (Backend)
lsof -ti:8080 | xargs kill -9

# Find and kill process on port 3306 (Database)
lsof -ti:3306 | xargs kill -9
```

### Database Connection Error

```bash
# Check if MySQL is running
docker-compose ps

# Restart MySQL
docker-compose restart mysql
```

### Build Errors

```bash
# Clean and rebuild backend
cd ecommerce-core-service
mvn clean install

# Clean and rebuild frontend
cd ecommerce-frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

1. **Browse Products**: http://localhost:3000/products
2. **Submit Enquiry**: http://localhost:3000/enquiry
3. **View API Docs**: http://localhost:8080/api/swagger-ui.html
4. **Check Admin Endpoints**: `/api/products`, `/api/enquiries`

---

## Need Help?

- See [Frontend README](./ecommerce-frontend/README.md)
- See [Backend README](./ecommerce-core-service/README.md)
- See [Project Overview](./PROJECT_OVERVIEW.md)
- See [Full Plan](./plan/full-plan.md)

---

**Happy Coding! 🎉**

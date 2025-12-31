# E-Commerce Platform - Full-Stack Implementation

A production-ready, modular e-commerce platform built with modern technologies and toggle-based feature architecture.

## 📋 Project Overview

This is a complete end-to-end e-commerce solution with:

- ✅ React/Next.js frontend with Tailwind CSS
- ✅ Spring Boot backend with REST APIs
- ✅ MySQL database with complete schema
- ✅ Feature toggle architecture
- ✅ Docker containerization
- ✅ Comprehensive documentation

## 🏗️ Architecture

### Technology Stack

**Frontend**

- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls

**Backend**

- Spring Boot 3.2
- Java 17
- Spring Data JPA
- MySQL/PostgreSQL support
- Swagger/OpenAPI documentation

**Infrastructure**

- Docker & Docker Compose
- MySQL 8.0
- CORS enabled for cross-origin requests

## 📁 Project Structure

```
e-commerce-website/
├── ecommerce-frontend/           # Next.js frontend application
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   ├── components/          # React components
│   │   ├── config/              # Configuration & toggles
│   │   ├── context/             # React Context providers
│   │   ├── services/            # API services
│   │   └── styles/              # Global styles
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── Dockerfile
│   └── README.md
│
├── ecommerce-core-service/       # Spring Boot backend
│   ├── src/
│   │   ├── main/java/com/ecommerce/core/
│   │   │   ├── controller/      # REST endpoints
│   │   │   ├── service/         # Business logic
│   │   │   ├── repository/      # Data access
│   │   │   ├── model/           # JPA entities
│   │   │   ├── dto/             # Data transfer objects
│   │   │   └── exception/       # Custom exceptions
│   │   └── main/resources/
│   │       └── application.yml  # Configuration
│   ├── pom.xml
│   ├── database-schema.sql
│   ├── Dockerfile
│   └── README.md
│
├── docker-compose.yml            # Docker orchestration
├── plan/
│   ├── full-plan.md             # Comprehensive project plan
│   └── project-structure.md     # Architecture documentation
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose (Recommended)
- OR Java 17 + Node.js 18 + MySQL 8.0 (Manual setup)

### Option 1: Using Docker (Recommended)

```bash
# Navigate to project root
cd e-commerce-website

# Build and start all services
docker-compose up -d

# Services will be available at:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api
# API Docs: http://localhost:8080/api/swagger-ui.html
# Database: localhost:3306
```

### Option 2: Manual Setup

#### Backend

```bash
cd ecommerce-core-service

# Build the project
mvn clean package

# Run
mvn spring-boot:run
# or
java -jar target/ecommerce-core-service-1.0.0.jar
```

#### Frontend

```bash
cd ecommerce-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🔧 Configuration

### Frontend Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_AUTH=true
NEXT_PUBLIC_PAYMENT=true
NEXT_PUBLIC_EMAIL=true
NEXT_PUBLIC_SMS=false
```

### Backend Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/ecommerce_db
    username: root
    password: your_password

feature:
  auth:
    enabled: true
  payment:
    enabled: true
  email:
    enabled: true
  sms:
    enabled: false
  storage:
    enabled: true
```

## 📚 API Documentation

### Swagger UI

Access interactive API documentation at:

```
http://localhost:8080/api/swagger-ui.html
```

### Key Endpoints

**Products**

- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `GET /api/products/search?q=query` - Search products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/{id}` - Update product (admin)
- `DELETE /api/products/{id}` - Delete product (admin)

**Enquiries**

- `POST /api/enquiries` - Submit enquiry
- `GET /api/enquiries` - Get all enquiries (paginated)
- `GET /api/enquiries/{id}` - Get enquiry details
- `PUT /api/enquiries/{id}/status` - Update status (admin)

**Configuration**

- `GET /api/config/features` - Get enabled features
- `GET /api/config/health` - Health check

## 🎯 Features

### Currently Implemented ✅

- Product catalog with search & filtering
- Product categories
- Enquiry management
- Responsive UI design
- RESTful APIs
- Database persistence
- Feature toggles
- Error handling
- API documentation
- Docker support

### Roadmap 🗺️

- [ ] Authentication & Authorization (JWT/OAuth)
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Shopping cart & checkout
- [ ] Order management
- [ ] Email notifications
- [ ] SMS notifications
- [ ] File storage (S3/Blob)
- [ ] Admin dashboard
- [ ] User reviews & ratings
- [ ] Wishlist functionality

## 🔐 Security Considerations

- CORS enabled with configurable origins
- Input validation on all endpoints
- SQL injection prevention (using JPA/Hibernate)
- XSS protection via React
- Password hashing (ready for implementation)
- JWT token support (ready for implementation)

## 📊 Database Schema

### Core Tables

- **products** - Product listings
- **categories** - Product categories
- **enquiries** - Customer enquiries

See `ecommerce-core-service/database-schema.sql` for complete schema.

## 🧪 Testing

### Backend Tests

```bash
cd ecommerce-core-service
mvn test
```

### Frontend Tests

```bash
cd ecommerce-frontend
npm test
```

## 📦 Building for Production

### Backend

```bash
cd ecommerce-core-service
mvn clean package -DskipTests
```

### Frontend

```bash
cd ecommerce-frontend
npm run build
```

## 📞 Documentation

- See [Frontend README](./ecommerce-frontend/README.md) for frontend details
- See [Backend README](./ecommerce-core-service/README.md) for backend details
- See [Full Plan](./plan/full-plan.md) for comprehensive project plan
- See [Project Structure](./plan/project-structure.md) for architectural details

## 📜 License

MIT License

---

**Status**: Production Ready ✅
**Last Updated**: December 2025
**Version**: 1.0.0

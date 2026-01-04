# 🛒 E-Commerce Platform

A production-ready, full-stack e-commerce platform built with **Next.js 14**, **Spring Boot 3.2**, and **MySQL 8.0**. Features a modular, toggle-based architecture for flexible deployment modes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-17-orange.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green.svg)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

This e-commerce platform supports three operating modes:

- **Catalog Mode**: Product browsing and enquiry submission
- **Commerce Mode**: Full shopping cart and checkout capabilities
- **Enterprise Mode**: All features including email, SMS, and analytics

## ✨ Features

### Customer Features

- 🏪 Product catalog with categories
- 🔍 Search and filter products
- 📝 Product enquiry system
- 🛒 Shopping cart (toggle-based)
- 💳 Secure checkout (toggle-based)

### Admin Features

- 📊 Dashboard with KPIs
- 📦 Product management (CRUD)
- 📂 Category management
- 📬 Enquiry management
- ⚙️ Feature toggle configuration

### Technical Features

- 🔐 JWT Authentication (optional)
- 📱 Responsive design (mobile-first)
- 🚀 Server-side rendering (SSR)
- 📖 Swagger/OpenAPI documentation
- 🐳 Docker containerization
- 🔧 Environment-based configuration

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │     │    Backend      │     │    Database     │
│   (Next.js)     │────▶│  (Spring Boot)  │────▶│    (MySQL)      │
│   Port: 3000    │     │   Port: 8080    │     │   Port: 3306    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 🛠️ Tech Stack

| Layer            | Technology                                     |
| ---------------- | ---------------------------------------------- |
| Frontend         | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Backend          | Spring Boot 3.2, Java 17, Spring Data JPA      |
| Database         | MySQL 8.0, H2 (testing)                        |
| Documentation    | Swagger/OpenAPI 3.0                            |
| Containerization | Docker, Docker Compose                         |

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose (recommended) OR
- Java 17+, Node.js 18+, MySQL 8.0

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/prasadsanap8149/e-commerce-website.git
cd e-commerce-website

# Start all services
docker-compose up -d

# Access the applications:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080/api
# Swagger UI: http://localhost:8080/api/swagger-ui.html
```

### Option 2: Manual Setup

```bash
# 1. Start MySQL
mysql -u root -p
CREATE DATABASE ecommerce_db;

# 2. Start Backend
cd ecommerce-core-service
./mvnw spring-boot:run

# 3. Start Frontend
cd ecommerce-frontend
npm install
npm run dev
```

## 📚 API Documentation

### Base URL

```
http://localhost:8080/api
```

### Swagger UI

```
http://localhost:8080/api/swagger-ui.html
```

### Quick API Reference

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/products`           | Get all products  |
| GET    | `/products/{id}`      | Get product by ID |
| GET    | `/products/search?q=` | Search products   |
| POST   | `/products`           | Create product    |
| PUT    | `/products/{id}`      | Update product    |
| DELETE | `/products/{id}`      | Delete product    |
| POST   | `/enquiries`          | Submit enquiry    |
| GET    | `/enquiries`          | Get all enquiries |

See [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) for complete API reference.

## 📁 Project Structure

```
e-commerce-website/
├── ecommerce-frontend/        # Next.js frontend
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   ├── components/       # React components
│   │   ├── config/           # Configuration
│   │   ├── context/          # React Context
│   │   └── services/         # API services
│   └── Dockerfile
│
├── ecommerce-core-service/    # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/ecommerce/core/
│   │       ├── controller/   # REST controllers
│   │       ├── service/      # Business logic
│   │       ├── repository/   # Data access
│   │       ├── model/        # JPA entities
│   │       └── dto/          # Data transfer objects
│   └── Dockerfile
│
├── docs/                      # Documentation
├── docker-compose.yml         # Docker orchestration
└── README.md
```

## ⚙️ Configuration

### Environment Variables

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_AUTH=false
NEXT_PUBLIC_PAYMENT=false
```

#### Backend (application.yml)

```yaml
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db
feature.auth.enabled=true
feature.payment.enabled=true
```

## 🔧 Development

### Backend Development

```bash
cd ecommerce-core-service
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### Frontend Development

```bash
cd ecommerce-frontend
npm run dev
```

### Running Tests

```bash
# Backend tests
cd ecommerce-core-service
./mvnw test

# Frontend tests
cd ecommerce-frontend
npm test
```

## 🚢 Deployment

### Docker Deployment

```bash
docker-compose -f docker-compose.yml up -d --build
```

### Production Checklist

- [ ] Update database credentials
- [ ] Configure CORS properly
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure logging

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Prasad Sanap](https://github.com/prasadsanap8149)

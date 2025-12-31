# Ecommerce Core Service

Core backend service for e-commerce platform built with Spring Boot 3.

## Features

- ✅ Product management (CRUD operations)
- ✅ Category management
- ✅ Enquiry management
- ✅ Search and filtering
- ✅ Feature toggles
- ✅ REST API with Swagger documentation
- ✅ Error handling and validation
- ✅ Database persistence with JPA/Hibernate
- ✅ Logging with SLF4J

## Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8.0+ (or PostgreSQL)

## Getting Started

### Installation

```bash
# Clone the repository
cd ecommerce-core-service

# Install dependencies
mvn clean install

# Build the project
mvn clean package
```

### Configuration

Edit `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/ecommerce_db
    username: root
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update
```

### Running the Service

```bash
# Development mode
mvn spring-boot:run

# Production mode
java -jar target/ecommerce-core-service-1.0.0.jar
```

Service will be available at: `http://localhost:8080/api`

### API Documentation

Swagger UI: `http://localhost:8080/api/swagger-ui.html`

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{categoryId}` - Get products by category
- `GET /api/products/search?q=query` - Search products
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Enquiries

- `POST /api/enquiries` - Create enquiry
- `GET /api/enquiries` - Get all enquiries
- `GET /api/enquiries/{id}` - Get enquiry by ID
- `PUT /api/enquiries/{id}/status` - Update enquiry status
- `DELETE /api/enquiries/{id}` - Delete enquiry

### Configuration

- `GET /api/config/features` - Get feature toggles
- `GET /api/config/health` - Health check

## Database Schema

See `database-schema.sql` for complete schema.

## Architecture

```
ecommerce-core-service/
├── controller/      # REST endpoints
├── service/         # Business logic
├── repository/      # Data access layer
├── model/          # JPA entities
├── dto/            # Data transfer objects
├── exception/      # Custom exceptions
└── config/         # Configuration
```

## Feature Toggles

Enable/disable features via `application.yml`:

```yaml
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

## Testing

```bash
mvn test
```

## License

MIT

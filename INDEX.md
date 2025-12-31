# E-Commerce Platform - Development Index

Welcome! This file helps you navigate the entire e-commerce platform codebase.

## 📚 Documentation Files

### Getting Started

- **[QUICK_START.md](./QUICK_START.md)** ⭐ START HERE

  - 5-minute setup with Docker
  - Common commands
  - Troubleshooting

- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)**
  - Complete project overview
  - Architecture & technology stack
  - Feature list & roadmap

### Detailed Plans

- **[plan/full-plan.md](./plan/full-plan.md)**

  - Comprehensive development plan
  - Phase-wise breakdown
  - Customization matrix

- **[plan/project-structure.md](./plan/project-structure.md)**
  - Detailed architectural design
  - Repository strategy
  - Service communication

### Module Documentation

- **[ecommerce-frontend/README.md](./ecommerce-frontend/README.md)**

  - Frontend setup & features
  - Component structure
  - Feature toggles
  - Environment variables

- **[ecommerce-core-service/README.md](./ecommerce-core-service/README.md)**
  - Backend setup & features
  - API endpoints
  - Database schema
  - Feature toggles

---

## 🏗️ Project Structure

```
📦 e-commerce-website/
│
├── 📁 ecommerce-frontend/           # React/Next.js application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── app/                    # Pages (App Router)
│   │   ├── components/             # Reusable React components
│   │   │   ├── common/            # Header, Footer, Loader
│   │   │   ├── product/           # Product listing & details
│   │   │   ├── cart/              # Shopping cart
│   │   │   └── enquiry/           # Enquiry forms
│   │   ├── config/                # Configuration & toggles
│   │   ├── context/               # React Context providers
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── services/              # API client services
│   │   └── styles/                # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── Dockerfile
│   └── README.md
│
├── 📁 ecommerce-core-service/       # Spring Boot backend
│   ├── src/main/java/com/ecommerce/core/
│   │   ├── EcommerceCoreServiceApplication.java
│   │   ├── config/                # Spring configuration
│   │   ├── controller/            # REST endpoints
│   │   ├── service/               # Business logic
│   │   ├── repository/            # Data access (JPA)
│   │   ├── model/                 # JPA entities
│   │   ├── dto/                   # Data transfer objects
│   │   └── exception/             # Exception handling
│   ├── src/main/resources/
│   │   ├── application.yml        # Configuration
│   │   └── application-test.yml   # Test configuration
│   ├── pom.xml
│   ├── database-schema.sql
│   ├── Dockerfile
│   └── README.md
│
├── 📁 plan/                         # Planning documents
│   ├── full-plan.md               # Comprehensive plan
│   └── project-structure.md       # Architecture design
│
├── 📁 docs/                         # Documentation (optional)
│
├── docker-compose.yml              # Docker orchestration
├── PROJECT_OVERVIEW.md             # Project overview
├── QUICK_START.md                  # Quick start guide
├── INDEX.md                        # This file
├── .gitignore
└── README.md
```

---

## 🚀 Quick Navigation

### For Frontend Developers

1. Read: [QUICK_START.md](./QUICK_START.md)
2. Explore: [ecommerce-frontend/README.md](./ecommerce-frontend/README.md)
3. Check: [ecommerce-frontend/src/](./ecommerce-frontend/src/)
4. Key files:
   - Config: [src/config/featureToggle.ts](./ecommerce-frontend/src/config/featureToggle.ts)
   - Pages: [src/app/](./ecommerce-frontend/src/app/)
   - Components: [src/components/](./ecommerce-frontend/src/components/)
   - Services: [src/services/](./ecommerce-frontend/src/services/)

### For Backend Developers

1. Read: [QUICK_START.md](./QUICK_START.md)
2. Explore: [ecommerce-core-service/README.md](./ecommerce-core-service/README.md)
3. Check: [ecommerce-core-service/src/main/java/](./ecommerce-core-service/src/main/java/)
4. Key files:
   - Main: [EcommerceCoreServiceApplication.java](./ecommerce-core-service/src/main/java/com/ecommerce/core/EcommerceCoreServiceApplication.java)
   - Controllers: [controller/](./ecommerce-core-service/src/main/java/com/ecommerce/core/controller/)
   - Services: [service/](./ecommerce-core-service/src/main/java/com/ecommerce/core/service/)
   - Models: [model/](./ecommerce-core-service/src/main/java/com/ecommerce/core/model/)
   - Schema: [database-schema.sql](./ecommerce-core-service/database-schema.sql)

### For DevOps/Infrastructure

1. Read: [QUICK_START.md](./QUICK_START.md)
2. Check: [docker-compose.yml](./docker-compose.yml)
3. Key files:
   - Frontend Docker: [ecommerce-frontend/Dockerfile](./ecommerce-frontend/Dockerfile)
   - Backend Docker: [ecommerce-core-service/Dockerfile](./ecommerce-core-service/Dockerfile)
   - Compose: [docker-compose.yml](./docker-compose.yml)

### For Project Managers

1. Read: [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
2. Read: [plan/full-plan.md](./plan/full-plan.md)
3. Check: [plan/project-structure.md](./plan/project-structure.md)

---

## 🎯 Key Endpoints

### Frontend Routes

- `/` - Home page
- `/products` - Product listing
- `/products/[id]` - Product details
- `/enquiry` - Enquiry form
- `/cart` - Shopping cart

### API Endpoints

- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `GET /api/products/search?q=query` - Search products
- `POST /api/enquiries` - Submit enquiry
- `GET /api/enquiries` - Get all enquiries
- `GET /api/config/features` - Get feature toggles
- `GET /api/config/health` - Health check

---

## 🔧 Important Files & Locations

### Frontend

| File                                                                            | Purpose                    |
| ------------------------------------------------------------------------------- | -------------------------- |
| [.env.local](./ecommerce-frontend/.env.local)                                   | Environment variables      |
| [next.config.js](./ecommerce-frontend/next.config.js)                           | Next.js configuration      |
| [tsconfig.json](./ecommerce-frontend/tsconfig.json)                             | TypeScript configuration   |
| [tailwind.config.js](./ecommerce-frontend/tailwind.config.js)                   | Tailwind CSS configuration |
| [src/config/featureToggle.ts](./ecommerce-frontend/src/config/featureToggle.ts) | Feature toggles            |
| [src/config/apiClient.ts](./ecommerce-frontend/src/config/apiClient.ts)         | API client setup           |

### Backend

| File                                                                                                                                   | Purpose            |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| [pom.xml](./ecommerce-core-service/pom.xml)                                                                                            | Maven dependencies |
| [application.yml](./ecommerce-core-service/src/main/resources/application.yml)                                                         | Configuration      |
| [database-schema.sql](./ecommerce-core-service/database-schema.sql)                                                                    | Database schema    |
| [EcommerceCoreServiceApplication.java](./ecommerce-core-service/src/main/java/com/ecommerce/core/EcommerceCoreServiceApplication.java) | Main application   |

### Infrastructure

| File                                                                     | Purpose               |
| ------------------------------------------------------------------------ | --------------------- |
| [docker-compose.yml](./docker-compose.yml)                               | Service orchestration |
| [ecommerce-frontend/Dockerfile](./ecommerce-frontend/Dockerfile)         | Frontend image        |
| [ecommerce-core-service/Dockerfile](./ecommerce-core-service/Dockerfile) | Backend image         |

---

## 💡 Common Tasks

### Add New Frontend Page

1. Create file in `ecommerce-frontend/src/app/`
2. Use existing components from `src/components/`
3. Call services from `src/services/`
4. Use feature toggles from `src/config/featureToggle.ts`

### Add New API Endpoint

1. Create entity in `ecommerce-core-service/src/main/java/com/ecommerce/core/model/`
2. Create repository in `src/main/java/com/ecommerce/core/repository/`
3. Create service in `src/main/java/com/ecommerce/core/service/`
4. Create controller in `src/main/java/com/ecommerce/core/controller/`
5. Create DTO in `src/main/java/com/ecommerce/core/dto/`

### Toggle a Feature

1. Edit environment variables (frontend): `ecommerce-frontend/.env.local`
2. Edit configuration (backend): `ecommerce-core-service/src/main/resources/application.yml`
3. Check feature in frontend: `featureToggle.ts`
4. Restart services

### Deploy to Production

1. Follow [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Building for Production section
2. Build Docker images: `docker-compose build`
3. Push to registry
4. Update deployment configuration
5. Deploy to cloud (AWS, Azure, etc.)

---

## 📊 Technology Details

### Frontend Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context

### Backend Stack

- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **ORM**: JPA/Hibernate
- **Database**: MySQL 8.0 / PostgreSQL
- **Documentation**: Swagger/OpenAPI
- **Build Tool**: Maven

### Infrastructure

- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Networking**: Docker Network

---

## ✅ Checklist for New Developers

- [ ] Read [QUICK_START.md](./QUICK_START.md)
- [ ] Run `docker-compose up -d`
- [ ] Access frontend at http://localhost:3000
- [ ] Access backend at http://localhost:8080/api
- [ ] Read module READMEs
- [ ] Explore codebase structure
- [ ] Run sample API calls (see QUICK_START.md)
- [ ] Make a test code change
- [ ] Commit to your feature branch

---

## 🆘 Support & Resources

### Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick setup guide
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Full overview
- [ecommerce-frontend/README.md](./ecommerce-frontend/README.md) - Frontend guide
- [ecommerce-core-service/README.md](./ecommerce-core-service/README.md) - Backend guide
- [plan/full-plan.md](./plan/full-plan.md) - Development plan
- [plan/project-structure.md](./plan/project-structure.md) - Architecture details

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Docker Documentation](https://docs.docker.com)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Common Issues

See [QUICK_START.md - Troubleshooting](./QUICK_START.md#troubleshooting)

---

## 📝 Version Information

- **Project Version**: 1.0.0
- **Frontend**: Next.js 14, React 18
- **Backend**: Spring Boot 3.2, Java 17
- **Database**: MySQL 8.0
- **Docker**: Latest stable
- **Last Updated**: December 2025

---

**Welcome to the team! Happy coding! 🚀**

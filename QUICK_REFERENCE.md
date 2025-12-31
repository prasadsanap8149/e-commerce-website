# 🎯 Developer's Quick Reference

## Start Here ⭐

```
┌─────────────────────────────────────────────┐
│                                             │
│  🚀 QUICK START (5 MINUTES)                 │
│                                             │
│  1. cd e-commerce-website                   │
│  2. docker-compose up -d                    │
│  3. Access:                                 │
│     • Frontend: http://localhost:3000       │
│     • API: http://localhost:8080/api        │
│     • Docs: http://localhost:8080/api/...   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 📚 Documentation Map

```
INDEX.md ← START HERE FOR NAVIGATION
    ↓
QUICK_START.md ← SETUP & COMMON COMMANDS
    ↓
PROJECT_OVERVIEW.md ← FULL OVERVIEW
    ↓
IMPLEMENTATION_SUMMARY.md ← WHAT WAS BUILT
    ↓
ecommerce-frontend/README.md ← FRONTEND DETAILS
    ↓
ecommerce-core-service/README.md ← BACKEND DETAILS
    ↓
plan/full-plan.md ← BUSINESS PLAN
    ↓
plan/project-structure.md ← ARCHITECTURE
```

---

## 🏗️ Project Structure at a Glance

```
e-commerce-website/
│
├── 📁 ecommerce-frontend/          React + Next.js
│   ├── src/app/                    Pages
│   ├── src/components/             Components
│   ├── src/config/                 Config & Toggles
│   ├── src/services/               API Services
│   ├── src/context/                State Management
│   └── src/styles/                 Styling
│
├── 📁 ecommerce-core-service/      Spring Boot Backend
│   ├── src/main/java/.../
│   │   ├── controller/             REST APIs
│   │   ├── service/                Business Logic
│   │   ├── repository/             Data Access
│   │   ├── model/                  Entities
│   │   ├── dto/                    Data Transfer
│   │   └── exception/              Error Handling
│   ├── database-schema.sql         Database Schema
│   └── pom.xml                     Dependencies
│
├── 📄 docker-compose.yml           Docker Setup
├── 📄 INDEX.md                     Navigation
├── 📄 QUICK_START.md               Get Started
├── 📄 PROJECT_OVERVIEW.md          Full Overview
└── 📄 plan/                        Planning Docs
```

---

## 🔧 Key Files Reference

### Frontend Configuration

| File                          | Purpose                   |
| ----------------------------- | ------------------------- |
| `.env.local`                  | Dev environment variables |
| `next.config.js`              | Next.js config            |
| `src/config/featureToggle.ts` | Feature toggles           |
| `src/config/apiClient.ts`     | API setup                 |

### Backend Configuration

| File                                   | Purpose           |
| -------------------------------------- | ----------------- |
| `application.yml`                      | App configuration |
| `pom.xml`                              | Dependencies      |
| `database-schema.sql`                  | DB schema         |
| `EcommerceCoreServiceApplication.java` | Main app          |

### Infrastructure

| File                                | Purpose        |
| ----------------------------------- | -------------- |
| `docker-compose.yml`                | Services setup |
| `ecommerce-frontend/Dockerfile`     | Frontend image |
| `ecommerce-core-service/Dockerfile` | Backend image  |

---

## 🎯 Common Tasks

### Setup & Run

```bash
# Using Docker (Easiest)
docker-compose up -d

# Manual - Backend
cd ecommerce-core-service
mvn spring-boot:run

# Manual - Frontend
cd ecommerce-frontend
npm install
npm run dev
```

### Test APIs

```bash
# Get products
curl http://localhost:8080/api/products

# Submit enquiry
curl -X POST http://localhost:8080/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","phone":"123","message":"Hi"}'

# Check features
curl http://localhost:8080/api/config/features
```

### Code Changes

```bash
# Frontend - New page
# Create: ecommerce-frontend/src/app/new-page/page.tsx

# Backend - New endpoint
# Create controller in: ecommerce-core-service/src/main/java/.../controller/

# Both - Restart services
docker-compose restart
```

---

## 📊 API Endpoints Quick Reference

```
PRODUCTS
  GET     /api/products
  GET     /api/products/{id}
  GET     /api/products/category/{id}
  GET     /api/products/search?q=query
  POST    /api/products
  PUT     /api/products/{id}
  DELETE  /api/products/{id}

ENQUIRIES
  POST    /api/enquiries
  GET     /api/enquiries
  GET     /api/enquiries/{id}
  GET     /api/enquiries/status/{status}
  PUT     /api/enquiries/{id}/status
  DELETE  /api/enquiries/{id}

CONFIG
  GET     /api/config/features
  GET     /api/config/health
```

---

## 🎓 Learning Path

### For New Developers

1. ✅ Read [QUICK_START.md](./QUICK_START.md)
2. ✅ Run `docker-compose up -d`
3. ✅ Access frontend & API
4. ✅ Read [INDEX.md](./INDEX.md)
5. ✅ Explore source code
6. ✅ Make a test change

### For Frontend Developers

1. Review: [ecommerce-frontend/README.md](./ecommerce-frontend/README.md)
2. Focus on: `src/app/`, `src/components/`, `src/services/`
3. Key files: `src/config/featureToggle.ts`, `src/config/apiClient.ts`
4. Edit pages in: `src/app/`

### For Backend Developers

1. Review: [ecommerce-core-service/README.md](./ecommerce-core-service/README.md)
2. Focus on: `controller/`, `service/`, `repository/`, `model/`
3. Key files: `application.yml`, `database-schema.sql`
4. API docs: Visit `http://localhost:8080/api/swagger-ui.html`

### For DevOps

1. Review: [docker-compose.yml](./docker-compose.yml)
2. Check: [Dockerfiles](./ecommerce-frontend/Dockerfile)
3. Configure: Environment variables
4. Deploy: Follow production build steps

---

## 🔑 Feature Toggles

Toggle features by editing environment variables:

### Frontend (.env.local)

```env
NEXT_PUBLIC_AUTH=true
NEXT_PUBLIC_PAYMENT=true
NEXT_PUBLIC_EMAIL=true
NEXT_PUBLIC_SMS=false
```

### Backend (application.yml)

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
```

Then check enabled features:

```bash
curl http://localhost:8080/api/config/features
```

---

## 📞 Help & Support

### Can't Find Something?

→ Check [INDEX.md](./INDEX.md) - Complete navigation guide

### Setup Issues?

→ Check [QUICK_START.md](./QUICK_START.md) - Troubleshooting section

### Want Details?

→ Read [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)

### Understanding Architecture?

→ See [plan/project-structure.md](./plan/project-structure.md)

---

## ⚡ Quick Checklist

- [ ] Read [QUICK_START.md](./QUICK_START.md)
- [ ] Run `docker-compose up -d`
- [ ] Access http://localhost:3000
- [ ] Access http://localhost:8080/api/swagger-ui.html
- [ ] Test APIs with curl or Postman
- [ ] Explore codebase
- [ ] Make first code change
- [ ] Read full [INDEX.md](./INDEX.md)

---

## 🚀 You're Ready!

Everything is set up. Just:

```bash
docker-compose up -d
```

Then:

- Frontend: http://localhost:3000
- API: http://localhost:8080/api
- Docs: http://localhost:8080/api/swagger-ui.html

Happy coding! 🎉

---

**Need more help?** See [INDEX.md](./INDEX.md)

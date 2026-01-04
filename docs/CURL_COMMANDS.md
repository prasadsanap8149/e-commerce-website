# 🔧 cURL Commands Reference

Quick reference for all API endpoints using cURL commands.

## 🔗 Base URL

```bash
BASE_URL="http://localhost:8080/api"
```

---

## 📦 Products API

### Get All Products

```bash
curl -X GET "${BASE_URL}/products" \
  -H "Accept: application/json" | json_pp
```

### Get Product by ID

```bash
curl -X GET "${BASE_URL}/products/1" \
  -H "Accept: application/json" | json_pp
```

### Search Products

```bash
curl -X GET "${BASE_URL}/products/search?q=laptop" \
  -H "Accept: application/json" | json_pp
```

### Get Products by Category

```bash
curl -X GET "${BASE_URL}/products/category/1" \
  -H "Accept: application/json" | json_pp
```

### Get Products by Price Range

```bash
curl -X GET "${BASE_URL}/products/price-range?minPrice=10&maxPrice=500" \
  -H "Accept: application/json" | json_pp
```

### Create Product

```bash
curl -X POST "${BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "New Product",
    "description": "This is a new product description",
    "price": 99.99,
    "categoryId": 1,
    "image": "https://example.com/product.jpg",
    "stock": 100
  }' | json_pp
```

### Update Product

```bash
curl -X PUT "${BASE_URL}/products/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Updated Product Name",
    "description": "Updated product description",
    "price": 149.99,
    "categoryId": 1,
    "image": "https://example.com/updated-product.jpg",
    "stock": 50
  }' | json_pp
```

### Delete Product

```bash
curl -X DELETE "${BASE_URL}/products/1" \
  -H "Accept: application/json" -v
```

---

## 📬 Enquiries API

### Create Enquiry

```bash
curl -X POST "${BASE_URL}/enquiries" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "message": "I have a question about the Laptop Pro product. Is it available in silver color?",
    "productId": 1
  }' | json_pp
```

### Get All Enquiries (with pagination)

```bash
curl -X GET "${BASE_URL}/enquiries?page=1&size=10" \
  -H "Accept: application/json" | json_pp
```

### Get Enquiry by ID

```bash
curl -X GET "${BASE_URL}/enquiries/1" \
  -H "Accept: application/json" | json_pp
```

### Get Enquiries by Status

```bash
# PENDING enquiries
curl -X GET "${BASE_URL}/enquiries/status/PENDING?page=1&size=10" \
  -H "Accept: application/json" | json_pp

# REVIEWED enquiries
curl -X GET "${BASE_URL}/enquiries/status/REVIEWED?page=1&size=10" \
  -H "Accept: application/json" | json_pp

# RESOLVED enquiries
curl -X GET "${BASE_URL}/enquiries/status/RESOLVED?page=1&size=10" \
  -H "Accept: application/json" | json_pp
```

### Update Enquiry Status

```bash
# Mark as REVIEWED
curl -X PUT "${BASE_URL}/enquiries/1/status?status=REVIEWED" \
  -H "Accept: application/json" | json_pp

# Mark as RESOLVED
curl -X PUT "${BASE_URL}/enquiries/1/status?status=RESOLVED" \
  -H "Accept: application/json" | json_pp
```

### Delete Enquiry

```bash
curl -X DELETE "${BASE_URL}/enquiries/1" \
  -H "Accept: application/json" -v
```

---

## ⚙️ Configuration API

### Get Feature Configuration

```bash
curl -X GET "${BASE_URL}/config/features" \
  -H "Accept: application/json" | json_pp
```

### Health Check

```bash
curl -X GET "${BASE_URL}/config/health" \
  -H "Accept: application/json" | json_pp
```

---

## 🏷️ Categories API

### Get All Categories

```bash
curl -X GET "${BASE_URL}/categories" \
  -H "Accept: application/json" | json_pp
```

### Get Category by ID

```bash
curl -X GET "${BASE_URL}/categories/1" \
  -H "Accept: application/json" | json_pp
```

### Get Category by Name

```bash
curl -X GET "${BASE_URL}/categories/name/Electronics" \
  -H "Accept: application/json" | json_pp
```

### Create Category

```bash
curl -X POST "${BASE_URL}/categories" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "image": "https://example.com/electronics.jpg"
  }' | json_pp
```

### Update Category

```bash
curl -X PUT "${BASE_URL}/categories/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Updated Electronics",
    "description": "Updated description",
    "image": "https://example.com/updated.jpg"
  }' | json_pp
```

### Delete Category (Soft Delete)

```bash
curl -X DELETE "${BASE_URL}/categories/1" \
  -H "Accept: application/json" -v
```

---

## 🧪 Quick Test Script

Save this as `test-api.sh` and run it to test all endpoints:

```bash
#!/bin/bash

BASE_URL="http://localhost:8080/api"

echo "🧪 Testing E-Commerce API"
echo "=========================="

echo ""
echo "1️⃣ Testing Products API"
echo "------------------------"

echo "📦 Get All Products:"
curl -s -X GET "${BASE_URL}/products" -H "Accept: application/json" | head -c 200
echo "..."
echo ""

echo "📦 Get Product by ID (1):"
curl -s -X GET "${BASE_URL}/products/1" -H "Accept: application/json"
echo ""

echo "🔍 Search Products (laptop):"
curl -s -X GET "${BASE_URL}/products/search?q=laptop" -H "Accept: application/json" | head -c 200
echo "..."
echo ""

echo ""
echo "2️⃣ Testing Categories API"
echo "--------------------------"

echo "🏷️ Get All Categories:"
curl -s -X GET "${BASE_URL}/categories" -H "Accept: application/json" | head -c 200
echo "..."
echo ""

echo ""
echo "3️⃣ Testing Enquiries API"
echo "-------------------------"

echo "📝 Create Enquiry:"
curl -s -X POST "${BASE_URL}/enquiries" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1-555-0000",
    "message": "This is a test enquiry"
  }'
echo ""

echo "📬 Get All Enquiries:"
curl -s -X GET "${BASE_URL}/enquiries?page=1&size=5" -H "Accept: application/json" | head -c 300
echo "..."
echo ""

echo ""
echo "3️⃣ Testing Configuration API"
echo "-----------------------------"

echo "⚙️ Get Feature Configuration:"
curl -s -X GET "${BASE_URL}/config/features" -H "Accept: application/json"
echo ""

echo ""
echo "✅ API Tests Completed!"
```

Make it executable and run:

```bash
chmod +x test-api.sh
./test-api.sh
```

---

## 📝 Notes

1. **json_pp** - Pretty prints JSON output. If not available, you can use `jq` instead:

   ```bash
   curl ... | jq .
   ```

2. **-v flag** - Shows verbose output including HTTP status codes

3. **Authentication** - When auth is enabled, add:

   ```bash
   -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

4. **Windows Users** - Use PowerShell with `Invoke-RestMethod` or install Git Bash for cURL support

---

## 🔄 Common Workflows

### Create and Update a Product

```bash
# 1. Create a new product
PRODUCT_ID=$(curl -s -X POST "${BASE_URL}/products" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Product", "description": "Test", "price": 50, "categoryId": 1, "stock": 10}' | jq -r '.id')

echo "Created product with ID: $PRODUCT_ID"

# 2. Update the product
curl -X PUT "${BASE_URL}/products/${PRODUCT_ID}" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Product", "description": "Updated", "price": 75, "categoryId": 1, "stock": 5}'

# 3. Delete the product
curl -X DELETE "${BASE_URL}/products/${PRODUCT_ID}"
```

### Process an Enquiry

```bash
# 1. Create an enquiry
ENQUIRY_ID=$(curl -s -X POST "${BASE_URL}/enquiries" \
  -H "Content-Type: application/json" \
  -d '{"name": "Customer", "email": "customer@example.com", "phone": "123", "message": "Help!"}' | jq -r '.id')

echo "Created enquiry with ID: $ENQUIRY_ID"

# 2. Mark as reviewed
curl -X PUT "${BASE_URL}/enquiries/${ENQUIRY_ID}/status?status=REVIEWED"

# 3. Mark as resolved
curl -X PUT "${BASE_URL}/enquiries/${ENQUIRY_ID}/status?status=RESOLVED"
```

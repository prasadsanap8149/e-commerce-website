# Edge Case Handling Implementation

This document summarizes all the edge case handling implemented in both the backend and frontend of the e-commerce application.

## Backend Edge Case Handling

### 1. DTOs - Input Validation with Jakarta Validation

#### ProductDTO.java

- `@NotBlank` - Product name is required
- `@Size(min=2, max=255)` - Name length validation
- `@Size(max=5000)` - Description length limit
- `@NotNull` - Price is required
- `@DecimalMin(0.01)` - Price must be positive
- `@DecimalMax(999999.99)` - Price upper limit
- `@Size(max=500)` - Image URL length limit
- `@NotNull` - Stock is required
- `@Min(0)` - Stock cannot be negative
- `@Max(999999)` - Stock upper limit
- `@DecimalMin(0.0)` / `@DecimalMax(5.0)` - Rating bounds

#### EnquiryDTO.java

- `@NotBlank` - Name, email, phone, message required
- `@Size(min=2, max=100)` - Name length validation
- `@Email` - Email format validation
- `@Pattern` - Phone number format validation
- `@Size(min=10, max=5000)` - Message length validation

#### CategoryDTO.java

- `@NotBlank` - Category name required
- `@Size(max=100)` - Name length limit
- `@Size(max=5000)` - Description length limit
- `@Size(max=500)` - Image URL length limit

### 2. Controllers - Request Validation

#### All Controllers

- `@Validated` annotation on controller class
- `@Valid` annotation on `@RequestBody` parameters
- `@Positive` annotation on path variable IDs
- `@Min` / `@Max` annotations on pagination parameters

#### ProductController.java

- Search query sanitization (trim, length limit)
- Price range auto-swap if min > max
- Default value handling for optional parameters

#### EnquiryController.java

- Pagination parameter bounds (min=1, max=100 for size)
- Status enum validation

### 3. Services - Business Logic Validation

#### ProductService.java

- Null and negative ID checks
- Empty list handling with `Collections.emptyList()`
- Search query sanitization (SQL injection prevention)
- Price range validation and auto-correction
- DTO validation before create/update
- Input trimming and sanitization
- Rating bounds enforcement (0-5)

#### EnquiryService.java

- Email format validation with regex
- Phone format validation with regex
- Pagination parameter bounds
- Input sanitization (XSS prevention)
- Empty result handling
- Status null checks

#### CategoryService.java

- Duplicate name detection (case-insensitive)
- Null and negative ID checks
- Empty result handling
- Input trimming
- Validation messages

### 4. GlobalExceptionHandler - Comprehensive Error Handling

New exception handlers added:

- `MethodArgumentNotValidException` - For `@Valid` errors
- `ConstraintViolationException` - For path/query param validation
- `MethodArgumentTypeMismatchException` - For type conversion errors
- `MissingServletRequestParameterException` - For missing params
- `HttpMessageNotReadableException` - For invalid JSON
- `HttpRequestMethodNotSupportedException` - For wrong HTTP methods
- `HttpMediaTypeNotSupportedException` - For wrong content types
- `NoHandlerFoundException` - For unknown endpoints
- `IllegalArgumentException` - For invalid arguments

### 5. ErrorResponse - Enhanced Error Details

Added fields:

- `path` - Request path
- `details` - Field-level error details (Map<String, String>)
- `@JsonInclude(NON_NULL)` - Excludes null fields from response

---

## Frontend Edge Case Handling

### 1. ApiClient - Network & Error Handling

#### Enhanced Features:

- Custom `ApiError` class with status, code, and details
- `extractErrorMessage()` helper for consistent error messages
- `extractFieldErrors()` helper for form validation errors
- Network error detection and user-friendly messages
- HTTP status code specific messages (400, 401, 403, 404, etc.)
- Automatic retry for network errors (3 attempts with backoff)
- 401 unauthorized handling with redirect

### 2. Product Service

#### Validation:

- Type guards for Product and Product[]
- Input sanitization for search queries
- Parameter bounds validation (price range, pagination)
- URL encoding for path parameters
- Empty response handling

#### Error Handling:

- Consistent ApiError wrapping
- Error code assignment for debugging
- Console logging with extracted messages

### 3. Enquiry Service

#### Validation:

- Email regex validation
- Phone regex validation
- Form field validation before submission
- Input sanitization (email lowercase, phone cleanup)
- Status enum validation

#### Error Handling:

- Type guards for Enquiry and EnquiryPage
- Consistent error transformation
- Empty page handling

### 4. Category Service

#### Validation:

- Type guards for Category and Category[]
- Name required and length validation
- URL encoding for path parameters

#### Error Handling:

- Consistent ApiError wrapping
- Invalid data detection

### 5. Cart Context

#### Validation:

- Type guards for CartItem and CartItem[]
- Maximum quantity per item (99)
- Maximum items in cart (50)
- Quantity bounds validation
- Price validation (non-negative)

#### Error Handling:

- localStorage parse error recovery
- Storage quota exceeded handling
- Invalid data cleanup

#### Data Sanitization:

- ProductId trimming
- Name length limit
- Price and quantity bounds

### 6. EnquiryForm Component

#### Validation:

- Real-time field validation on blur
- Field-specific error messages
- Form-level validation before submit
- Character counters with warnings

#### Error Handling:

- Backend field error mapping
- User-friendly error display
- Field highlighting for errors

### 7. Validation Utilities (`src/utils/validation.ts`)

Common validation functions:

- `isValidEmail()` / `isValidPhone()` / `isValidUrl()`
- `isValidPrice()` / `isValidQuantity()`
- `isValidLength()` / `isValidProductId()`
- `sanitizeString()` / `sanitizePhone()` / `sanitizeEmail()`
- `sanitizeSearchQuery()`
- `formatPrice()` / `parseNumber()` / `parseInteger()`
- `clamp()` / `isEmpty()` / `debounce()`

---

## Error Response Format

All API errors follow this format:

```json
{
  "timestamp": "2024-01-01T12:00:00",
  "status": 400,
  "error": "Validation Error",
  "message": "name: Product name is required; price: Price must be greater than 0",
  "details": {
    "name": "Product name is required",
    "price": "Price must be greater than 0"
  }
}
```

---

## Best Practices Implemented

1. **Defense in Depth** - Validation at multiple layers (frontend, controller, service)
2. **Fail Fast** - Early validation to prevent unnecessary processing
3. **User-Friendly Messages** - Clear, actionable error messages
4. **Security** - Input sanitization, XSS prevention, SQL injection prevention
5. **Type Safety** - Type guards for runtime validation
6. **Graceful Degradation** - Empty arrays instead of errors for missing data
7. **Logging** - Comprehensive logging for debugging
8. **Consistency** - Same error format across all endpoints

package com.ecommerce.core.controller;

import com.ecommerce.core.dto.ProductDTO;
import com.ecommerce.core.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Products", description = "Product management endpoints")
@CrossOrigin(origins = "*", maxAge = 3600)
@Validated
public class ProductController {

    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Get all products")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        log.info("Fetching all products");
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ProductDTO> getProductById(
            @PathVariable @Positive(message = "Product ID must be positive") Long id) {
        log.info("Fetching product with id: {}", id);
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Get products by category")
    public ResponseEntity<List<ProductDTO>> getProductsByCategory(
            @PathVariable @Positive(message = "Category ID must be positive") Long categoryId) {
        log.info("Fetching products for category: {}", categoryId);
        List<ProductDTO> products = productService.getProductsByCategory(categoryId);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")
    @Operation(summary = "Search products")
    public ResponseEntity<List<ProductDTO>> searchProducts(
            @RequestParam(required = false, defaultValue = "") String q) {
        log.info("Searching products with query: {}", q);
        // Sanitize and validate search query
        String sanitizedQuery = q.trim();
        if (sanitizedQuery.length() > 200) {
            sanitizedQuery = sanitizedQuery.substring(0, 200);
        }
        List<ProductDTO> products = productService.searchProducts(sanitizedQuery);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/price-range")
    @Operation(summary = "Find products by price range")
    public ResponseEntity<List<ProductDTO>> findByPriceRange(
            @RequestParam @Min(value = 0, message = "Minimum price cannot be negative") Double minPrice,
            @RequestParam @Min(value = 0, message = "Maximum price cannot be negative") Double maxPrice) {
        log.info("Finding products in price range: {} - {}", minPrice, maxPrice);
        // Validate price range logic
        if (minPrice > maxPrice) {
            Double temp = minPrice;
            minPrice = maxPrice;
            maxPrice = temp;
            log.info("Swapped price range to: {} - {}", minPrice, maxPrice);
        }
        List<ProductDTO> products = productService.findByPriceRange(minPrice, maxPrice);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    @Operation(summary = "Create new product")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        log.info("Creating new product: {}", productDTO.getName());
        ProductDTO createdProduct = productService.createProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update product")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable @Positive(message = "Product ID must be positive") Long id,
            @Valid @RequestBody ProductDTO productDTO) {
        log.info("Updating product with id: {}", id);
        ProductDTO updatedProduct = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete product")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable @Positive(message = "Product ID must be positive") Long id) {
        log.info("Deleting product with id: {}", id);
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}

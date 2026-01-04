package com.ecommerce.core.service;

import com.ecommerce.core.dto.ProductDTO;
import com.ecommerce.core.exception.ResourceNotFoundException;
import com.ecommerce.core.exception.ValidationException;
import com.ecommerce.core.model.Product;
import com.ecommerce.core.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    public ProductDTO getProductById(Long id) {
        if (id == null || id <= 0) {
            throw new ValidationException("Product ID must be a positive number");
        }
        log.debug("Fetching product with id: {}", id);
        Product product = productRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDTO(product);
    }

    public List<ProductDTO> getAllProducts() {
        log.debug("Fetching all products");
        List<Product> products = productRepository.findByActiveTrue();
        if (products == null || products.isEmpty()) {
            log.info("No active products found");
            return Collections.emptyList();
        }
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> getProductsByCategory(Long categoryId) {
        if (categoryId == null || categoryId <= 0) {
            throw new ValidationException("Category ID must be a positive number");
        }
        log.debug("Fetching products for category: {}", categoryId);
        List<Product> products = productRepository.findByCategoryIdAndActiveTrue(categoryId);
        if (products == null || products.isEmpty()) {
            log.info("No products found for category: {}", categoryId);
            return Collections.emptyList();
        }
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> searchProducts(String query) {
        log.debug("Searching products with query: {}", query);
        // Handle empty or null query
        if (!StringUtils.hasText(query)) {
            log.info("Empty search query, returning all products");
            return getAllProducts();
        }
        // Sanitize query - remove potential SQL injection characters
        String sanitizedQuery = query.trim()
                .replaceAll("[<>\"'%;()&+]", "")
                .substring(0, Math.min(query.length(), 200));

        List<Product> products = productRepository.searchProducts(sanitizedQuery);
        if (products == null || products.isEmpty()) {
            log.info("No products found for query: {}", sanitizedQuery);
            return Collections.emptyList();
        }
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ProductDTO> findByPriceRange(Double minPrice, Double maxPrice) {
        // Validate and sanitize price range
        if (minPrice == null) {
            minPrice = 0.0;
        }
        if (maxPrice == null) {
            maxPrice = Double.MAX_VALUE;
        }
        if (minPrice < 0) {
            throw new ValidationException("Minimum price cannot be negative");
        }
        if (maxPrice < 0) {
            throw new ValidationException("Maximum price cannot be negative");
        }
        if (minPrice > maxPrice) {
            // Swap values if min > max
            Double temp = minPrice;
            minPrice = maxPrice;
            maxPrice = temp;
            log.info("Swapped price range values: {} - {}", minPrice, maxPrice);
        }

        log.debug("Fetching products in price range: {} - {}", minPrice, maxPrice);
        List<Product> products = productRepository.findByPriceRange(minPrice, maxPrice);
        if (products == null || products.isEmpty()) {
            log.info("No products found in price range: {} - {}", minPrice, maxPrice);
            return Collections.emptyList();
        }
        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        validateProductDTO(productDTO);

        log.debug("Creating new product: {}", productDTO.getName());
        Product product = Product.builder()
                .name(productDTO.getName().trim())
                .description(productDTO.getDescription() != null ? productDTO.getDescription().trim() : null)
                .price(productDTO.getPrice())
                .categoryId(productDTO.getCategoryId())
                .image(productDTO.getImage() != null ? productDTO.getImage().trim() : null)
                .stock(productDTO.getStock() != null ? productDTO.getStock() : 0)
                .rating(productDTO.getRating() != null ? Math.min(5.0, Math.max(0.0, productDTO.getRating())) : 0.0)
                .active(true)
                .build();
        Product savedProduct = productRepository.save(product);
        log.info("Created product with id: {}", savedProduct.getId());
        return convertToDTO(savedProduct);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        if (id == null || id <= 0) {
            throw new ValidationException("Product ID must be a positive number");
        }
        validateProductDTO(productDTO);

        log.debug("Updating product with id: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setName(productDTO.getName().trim());
        product.setDescription(
                productDTO.getDescription() != null ? productDTO.getDescription().trim() : product.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCategoryId(productDTO.getCategoryId());
        product.setImage(productDTO.getImage() != null ? productDTO.getImage().trim() : product.getImage());
        product.setStock(productDTO.getStock() != null ? productDTO.getStock() : product.getStock());
        if (productDTO.getRating() != null) {
            product.setRating(Math.min(5.0, Math.max(0.0, productDTO.getRating())));
        }

        Product updatedProduct = productRepository.save(product);
        log.info("Updated product with id: {}", updatedProduct.getId());
        return convertToDTO(updatedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (id == null || id <= 0) {
            throw new ValidationException("Product ID must be a positive number");
        }
        log.debug("Deleting product with id: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        product.setActive(false);
        productRepository.save(product);
        log.info("Soft deleted product with id: {}", id);
    }

    private void validateProductDTO(ProductDTO dto) {
        if (dto == null) {
            throw new ValidationException("Product data is required");
        }
        if (!StringUtils.hasText(dto.getName())) {
            throw new ValidationException("Product name is required");
        }
        if (dto.getName().length() > 255) {
            throw new ValidationException("Product name must be less than 255 characters");
        }
        if (dto.getPrice() == null || dto.getPrice() <= 0) {
            throw new ValidationException("Product price must be greater than 0");
        }
        if (dto.getPrice() > 999999.99) {
            throw new ValidationException("Product price cannot exceed 999,999.99");
        }
        if (dto.getStock() != null && dto.getStock() < 0) {
            throw new ValidationException("Stock cannot be negative");
        }
        if (dto.getDescription() != null && dto.getDescription().length() > 5000) {
            throw new ValidationException("Description must be less than 5000 characters");
        }
    }

    private ProductDTO convertToDTO(Product product) {
        if (product == null) {
            return null;
        }
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .categoryId(product.getCategoryId())
                .image(product.getImage())
                .stock(product.getStock())
                .rating(product.getRating())
                .active(product.getActive())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }
}

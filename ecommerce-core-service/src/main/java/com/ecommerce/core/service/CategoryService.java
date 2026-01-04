package com.ecommerce.core.service;

import com.ecommerce.core.dto.CategoryDTO;
import com.ecommerce.core.exception.ResourceNotFoundException;
import com.ecommerce.core.exception.ValidationException;
import com.ecommerce.core.model.Category;
import com.ecommerce.core.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * Get all active categories
     */
    public List<CategoryDTO> getAllCategories() {
        log.debug("Fetching all active categories");
        List<Category> categories = categoryRepository.findByActiveTrue();
        if (categories == null || categories.isEmpty()) {
            log.info("No active categories found");
            return Collections.emptyList();
        }
        return categories.stream()
                .map(CategoryDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get all categories including inactive (admin)
     */
    public List<CategoryDTO> getAllCategoriesAdmin() {
        log.debug("Fetching all categories (admin)");
        List<Category> categories = categoryRepository.findAll();
        if (categories == null || categories.isEmpty()) {
            log.info("No categories found");
            return Collections.emptyList();
        }
        return categories.stream()
                .map(CategoryDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get category by ID
     */
    public CategoryDTO getCategoryById(Long id) {
        if (id == null || id <= 0) {
            throw new ValidationException("Category ID must be a positive number");
        }
        log.debug("Fetching category with id: {}", id);
        Category category = categoryRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        return CategoryDTO.fromEntity(category);
    }

    /**
     * Get category by name
     */
    public CategoryDTO getCategoryByName(String name) {
        if (!StringUtils.hasText(name)) {
            throw new ValidationException("Category name is required");
        }
        String sanitizedName = name.trim();
        log.debug("Fetching category with name: {}", sanitizedName);
        Category category = categoryRepository.findByNameAndActiveTrue(sanitizedName)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with name: " + sanitizedName));
        return CategoryDTO.fromEntity(category);
    }

    /**
     * Create a new category
     */
    @Transactional
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        validateCategoryDTO(categoryDTO);

        // Check for duplicate name
        String categoryName = categoryDTO.getName().trim();
        Optional<Category> existing = categoryRepository.findByNameIgnoreCase(categoryName);
        if (existing.isPresent()) {
            throw new ValidationException("Category with name '" + categoryName + "' already exists");
        }

        log.debug("Creating new category: {}", categoryName);
        Category category = Category.builder()
                .name(categoryName)
                .description(categoryDTO.getDescription() != null ? categoryDTO.getDescription().trim() : null)
                .image(categoryDTO.getImage() != null ? categoryDTO.getImage().trim() : null)
                .active(categoryDTO.getActive() != null ? categoryDTO.getActive() : true)
                .build();

        Category savedCategory = categoryRepository.save(category);
        log.info("Created category with id: {}", savedCategory.getId());
        return CategoryDTO.fromEntity(savedCategory);
    }

    /**
     * Update an existing category
     */
    @Transactional
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        if (id == null || id <= 0) {
            throw new ValidationException("Category ID must be a positive number");
        }
        validateCategoryDTO(categoryDTO);

        log.debug("Updating category with id: {}", id);
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        // Check for duplicate name (excluding current category)
        String newName = categoryDTO.getName().trim();
        Optional<Category> duplicateCategory = categoryRepository.findByNameIgnoreCase(newName);
        if (duplicateCategory.isPresent() && !duplicateCategory.get().getId().equals(id)) {
            throw new ValidationException("Category with name '" + newName + "' already exists");
        }

        existingCategory.setName(newName);
        existingCategory.setDescription(categoryDTO.getDescription() != null ? categoryDTO.getDescription().trim()
                : existingCategory.getDescription());
        existingCategory
                .setImage(categoryDTO.getImage() != null ? categoryDTO.getImage().trim() : existingCategory.getImage());

        if (categoryDTO.getActive() != null) {
            existingCategory.setActive(categoryDTO.getActive());
        }

        Category updatedCategory = categoryRepository.save(existingCategory);
        log.info("Updated category with id: {}", updatedCategory.getId());
        return CategoryDTO.fromEntity(updatedCategory);
    }

    /**
     * Soft delete a category (set active to false)
     */
    @Transactional
    public void deleteCategory(Long id) {
        if (id == null || id <= 0) {
            throw new ValidationException("Category ID must be a positive number");
        }
        log.debug("Soft deleting category with id: {}", id);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        category.setActive(false);
        categoryRepository.save(category);
        log.info("Soft deleted category with id: {}", id);
    }

    /**
     * Hard delete a category (permanent)
     */
    @Transactional
    public void hardDeleteCategory(Long id) {
        if (id == null || id <= 0) {
            throw new ValidationException("Category ID must be a positive number");
        }
        log.debug("Hard deleting category with id: {}", id);
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        categoryRepository.deleteById(id);
        log.info("Hard deleted category with id: {}", id);
    }

    private void validateCategoryDTO(CategoryDTO dto) {
        if (dto == null) {
            throw new ValidationException("Category data is required");
        }
        if (!StringUtils.hasText(dto.getName())) {
            throw new ValidationException("Category name is required");
        }
        if (dto.getName().length() > 100) {
            throw new ValidationException("Category name must be less than 100 characters");
        }
        if (dto.getDescription() != null && dto.getDescription().length() > 5000) {
            throw new ValidationException("Description must be less than 5000 characters");
        }
        if (dto.getImage() != null && dto.getImage().length() > 500) {
            throw new ValidationException("Image URL must be less than 500 characters");
        }
    }
}

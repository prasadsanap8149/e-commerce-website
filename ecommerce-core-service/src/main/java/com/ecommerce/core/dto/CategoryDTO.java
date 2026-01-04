package com.ecommerce.core.dto;

import com.ecommerce.core.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDTO {
    private Long id;

    @NotBlank(message = "Category name is required")
    @Size(max = 100, message = "Category name must be less than 100 characters")
    private String name;

    @Size(max = 5000, message = "Description must be less than 5000 characters")
    private String description;

    @Size(max = 500, message = "Image URL must be less than 500 characters")
    private String image;

    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Convert from Entity to DTO
    public static CategoryDTO fromEntity(Category category) {
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .image(category.getImage())
                .active(category.getActive())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }

    // Convert from DTO to Entity
    public Category toEntity() {
        return Category.builder()
                .id(this.id)
                .name(this.name)
                .description(this.description)
                .image(this.image)
                .active(this.active != null ? this.active : true)
                .build();
    }
}

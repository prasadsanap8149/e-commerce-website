package com.ecommerce.core.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Long categoryId;
    private String image;
    private Integer stock;
    private Double rating;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

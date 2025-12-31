package com.ecommerce.core.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnquiryDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private Long productId;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

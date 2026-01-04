package com.ecommerce.core.service;

import com.ecommerce.core.dto.EnquiryDTO;
import com.ecommerce.core.exception.ResourceNotFoundException;
import com.ecommerce.core.exception.ValidationException;
import com.ecommerce.core.model.Enquiry;
import com.ecommerce.core.model.Enquiry.EnquiryStatus;
import com.ecommerce.core.repository.EnquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    // Email validation pattern
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

    // Phone validation pattern - allows various formats
    private static final Pattern PHONE_PATTERN = Pattern.compile(
            "^[+]?[0-9\\-\\s()]{7,20}$");

    @Transactional
    public EnquiryDTO createEnquiry(EnquiryDTO enquiryDTO) {
        validateEnquiryDTO(enquiryDTO);

        log.debug("Creating new enquiry from: {}", enquiryDTO.getEmail());
        Enquiry enquiry = Enquiry.builder()
                .name(sanitizeInput(enquiryDTO.getName()))
                .email(enquiryDTO.getEmail().trim().toLowerCase())
                .phone(sanitizePhone(enquiryDTO.getPhone()))
                .message(sanitizeInput(enquiryDTO.getMessage()))
                .productId(enquiryDTO.getProductId())
                .status(EnquiryStatus.PENDING)
                .build();
        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        log.info("Created enquiry with id: {}", savedEnquiry.getId());
        return convertToDTO(savedEnquiry);
    }

    public EnquiryDTO getEnquiryById(Long id) {
        if (id == null || id <= 0) {
            throw new ValidationException("Enquiry ID must be a positive number");
        }
        log.debug("Fetching enquiry with id: {}", id);
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));
        return convertToDTO(enquiry);
    }

    public Page<EnquiryDTO> getAllEnquiries(int page, int size) {
        // Validate pagination parameters
        page = Math.max(1, page);
        size = Math.max(1, Math.min(100, size)); // Limit size to prevent memory issues

        log.debug("Fetching all enquiries - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdAt").descending());
        Page<Enquiry> enquiryPage = enquiryRepository.findAll(pageable);

        if (enquiryPage.isEmpty()) {
            log.info("No enquiries found");
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }

        return enquiryPage.map(this::convertToDTO);
    }

    public Page<EnquiryDTO> getEnquiriesByStatus(EnquiryStatus status, int page, int size) {
        if (status == null) {
            throw new ValidationException("Status is required");
        }

        // Validate pagination parameters
        page = Math.max(1, page);
        size = Math.max(1, Math.min(100, size));

        log.debug("Fetching enquiries with status: {} - page: {}, size: {}", status, page, size);
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdAt").descending());
        Page<Enquiry> enquiryPage = enquiryRepository.findByStatus(status, pageable);

        if (enquiryPage.isEmpty()) {
            log.info("No enquiries found with status: {}", status);
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }

        return enquiryPage.map(this::convertToDTO);
    }

    @Transactional
    public EnquiryDTO updateEnquiryStatus(Long id, EnquiryStatus status) {
        if (id == null || id <= 0) {
            throw new ValidationException("Enquiry ID must be a positive number");
        }
        if (status == null) {
            throw new ValidationException("Status is required");
        }

        log.debug("Updating enquiry {} status to: {}", id, status);
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));

        EnquiryStatus oldStatus = enquiry.getStatus();
        enquiry.setStatus(status);
        Enquiry updatedEnquiry = enquiryRepository.save(enquiry);
        log.info("Updated enquiry {} status from {} to {}", id, oldStatus, status);
        return convertToDTO(updatedEnquiry);
    }

    @Transactional
    public void deleteEnquiry(Long id) {
        if (id == null || id <= 0) {
            throw new ValidationException("Enquiry ID must be a positive number");
        }
        log.debug("Deleting enquiry with id: {}", id);
        if (!enquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Enquiry not found with id: " + id);
        }
        enquiryRepository.deleteById(id);
        log.info("Deleted enquiry with id: {}", id);
    }

    private void validateEnquiryDTO(EnquiryDTO dto) {
        if (dto == null) {
            throw new ValidationException("Enquiry data is required");
        }

        // Validate name
        if (!StringUtils.hasText(dto.getName())) {
            throw new ValidationException("Name is required");
        }
        if (dto.getName().length() < 2 || dto.getName().length() > 100) {
            throw new ValidationException("Name must be between 2 and 100 characters");
        }

        // Validate email
        if (!StringUtils.hasText(dto.getEmail())) {
            throw new ValidationException("Email is required");
        }
        if (!EMAIL_PATTERN.matcher(dto.getEmail().trim()).matches()) {
            throw new ValidationException("Please provide a valid email address");
        }

        // Validate phone
        if (!StringUtils.hasText(dto.getPhone())) {
            throw new ValidationException("Phone number is required");
        }
        if (!PHONE_PATTERN.matcher(dto.getPhone().trim()).matches()) {
            throw new ValidationException("Please provide a valid phone number");
        }

        // Validate message
        if (!StringUtils.hasText(dto.getMessage())) {
            throw new ValidationException("Message is required");
        }
        if (dto.getMessage().length() < 10 || dto.getMessage().length() > 5000) {
            throw new ValidationException("Message must be between 10 and 5000 characters");
        }
    }

    private String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        // Remove potential XSS characters while preserving legitimate content
        return input.trim()
                .replaceAll("<script[^>]*>.*?</script>", "")
                .replaceAll("<[^>]+>", "")
                .replaceAll("javascript:", "");
    }

    private String sanitizePhone(String phone) {
        if (phone == null) {
            return null;
        }
        // Keep only digits, plus sign, spaces, hyphens, and parentheses
        return phone.trim().replaceAll("[^0-9+\\-()\\s]", "");
    }

    private EnquiryDTO convertToDTO(Enquiry enquiry) {
        if (enquiry == null) {
            return null;
        }
        return EnquiryDTO.builder()
                .id(enquiry.getId())
                .name(enquiry.getName())
                .email(enquiry.getEmail())
                .phone(enquiry.getPhone())
                .message(enquiry.getMessage())
                .productId(enquiry.getProductId())
                .status(enquiry.getStatus() != null ? enquiry.getStatus().toString() : EnquiryStatus.PENDING.toString())
                .createdAt(enquiry.getCreatedAt())
                .updatedAt(enquiry.getUpdatedAt())
                .build();
    }
}

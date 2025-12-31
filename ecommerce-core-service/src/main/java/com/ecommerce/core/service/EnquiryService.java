package com.ecommerce.core.service;

import com.ecommerce.core.dto.EnquiryDTO;
import com.ecommerce.core.exception.ResourceNotFoundException;
import com.ecommerce.core.model.Enquiry;
import com.ecommerce.core.model.Enquiry.EnquiryStatus;
import com.ecommerce.core.repository.EnquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class EnquiryService {

    private final EnquiryRepository enquiryRepository;

    @Transactional
    public EnquiryDTO createEnquiry(EnquiryDTO enquiryDTO) {
        log.debug("Creating new enquiry from: {}", enquiryDTO.getEmail());
        Enquiry enquiry = Enquiry.builder()
                .name(enquiryDTO.getName())
                .email(enquiryDTO.getEmail())
                .phone(enquiryDTO.getPhone())
                .message(enquiryDTO.getMessage())
                .productId(enquiryDTO.getProductId())
                .status(EnquiryStatus.PENDING)
                .build();
        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        return convertToDTO(savedEnquiry);
    }

    public EnquiryDTO getEnquiryById(Long id) {
        log.debug("Fetching enquiry with id: {}", id);
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));
        return convertToDTO(enquiry);
    }

    public Page<EnquiryDTO> getAllEnquiries(int page, int size) {
        log.debug("Fetching all enquiries - page: {}, size: {}", page, size);
        Pageable pageable = PageRequest.of(page - 1, size);
        return enquiryRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    public Page<EnquiryDTO> getEnquiriesByStatus(EnquiryStatus status, int page, int size) {
        log.debug("Fetching enquiries with status: {} - page: {}, size: {}", status, page, size);
        Pageable pageable = PageRequest.of(page - 1, size);
        return enquiryRepository.findByStatus(status, pageable)
                .map(this::convertToDTO);
    }

    @Transactional
    public EnquiryDTO updateEnquiryStatus(Long id, EnquiryStatus status) {
        log.debug("Updating enquiry {} status to: {}", id, status);
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found with id: " + id));
        enquiry.setStatus(status);
        Enquiry updatedEnquiry = enquiryRepository.save(enquiry);
        return convertToDTO(updatedEnquiry);
    }

    @Transactional
    public void deleteEnquiry(Long id) {
        log.debug("Deleting enquiry with id: {}", id);
        if (!enquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Enquiry not found with id: " + id);
        }
        enquiryRepository.deleteById(id);
    }

    private EnquiryDTO convertToDTO(Enquiry enquiry) {
        return EnquiryDTO.builder()
                .id(enquiry.getId())
                .name(enquiry.getName())
                .email(enquiry.getEmail())
                .phone(enquiry.getPhone())
                .message(enquiry.getMessage())
                .productId(enquiry.getProductId())
                .status(enquiry.getStatus().toString())
                .createdAt(enquiry.getCreatedAt())
                .updatedAt(enquiry.getUpdatedAt())
                .build();
    }
}

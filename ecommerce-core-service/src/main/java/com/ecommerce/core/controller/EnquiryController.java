package com.ecommerce.core.controller;

import com.ecommerce.core.dto.EnquiryDTO;
import com.ecommerce.core.model.Enquiry.EnquiryStatus;
import com.ecommerce.core.service.EnquiryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enquiries")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "Enquiries", description = "Enquiry management endpoints")
@CrossOrigin(origins = "*", maxAge = 3600)
public class EnquiryController {

    private final EnquiryService enquiryService;

    @PostMapping
    @Operation(summary = "Create new enquiry")
    public ResponseEntity<EnquiryDTO> createEnquiry(@RequestBody EnquiryDTO enquiryDTO) {
        log.info("Creating new enquiry from: {}", enquiryDTO.getEmail());
        EnquiryDTO createdEnquiry = enquiryService.createEnquiry(enquiryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEnquiry);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get enquiry by ID")
    public ResponseEntity<EnquiryDTO> getEnquiryById(@PathVariable Long id) {
        log.info("Fetching enquiry with id: {}", id);
        EnquiryDTO enquiry = enquiryService.getEnquiryById(id);
        return ResponseEntity.ok(enquiry);
    }

    @GetMapping
    @Operation(summary = "Get all enquiries with pagination")
    public ResponseEntity<Page<EnquiryDTO>> getAllEnquiries(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Fetching all enquiries - page: {}, size: {}", page, size);
        Page<EnquiryDTO> enquiries = enquiryService.getAllEnquiries(page, size);
        return ResponseEntity.ok(enquiries);
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get enquiries by status")
    public ResponseEntity<Page<EnquiryDTO>> getEnquiriesByStatus(
            @PathVariable EnquiryStatus status,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        log.info("Fetching enquiries with status: {}", status);
        Page<EnquiryDTO> enquiries = enquiryService.getEnquiriesByStatus(status, page, size);
        return ResponseEntity.ok(enquiries);
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update enquiry status")
    public ResponseEntity<EnquiryDTO> updateEnquiryStatus(
            @PathVariable Long id,
            @RequestParam EnquiryStatus status) {
        log.info("Updating enquiry {} status to: {}", id, status);
        EnquiryDTO updatedEnquiry = enquiryService.updateEnquiryStatus(id, status);
        return ResponseEntity.ok(updatedEnquiry);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete enquiry")
    public ResponseEntity<Void> deleteEnquiry(@PathVariable Long id) {
        log.info("Deleting enquiry with id: {}", id);
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.noContent().build();
    }
}

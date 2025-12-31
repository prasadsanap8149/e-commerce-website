package com.ecommerce.core.repository;

import com.ecommerce.core.model.Enquiry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    Page<Enquiry> findByStatus(Enquiry.EnquiryStatus status, Pageable pageable);

    Page<Enquiry> findByEmail(String email, Pageable pageable);

    Optional<Enquiry> findByIdAndEmail(Long id, String email);
}

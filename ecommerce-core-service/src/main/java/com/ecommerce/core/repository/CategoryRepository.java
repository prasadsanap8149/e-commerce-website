package com.ecommerce.core.repository;

import com.ecommerce.core.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByIdAndActiveTrue(Long id);

    List<Category> findByActiveTrue();

    Optional<Category> findByNameAndActiveTrue(String name);
}

package com.fittrack.repository;

import com.fittrack.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FoodRepository extends JpaRepository<Food, UUID> {
    Optional<Food> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
}

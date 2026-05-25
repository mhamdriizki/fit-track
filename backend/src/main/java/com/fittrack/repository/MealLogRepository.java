package com.fittrack.repository;

import com.fittrack.model.MealLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface MealLogRepository extends JpaRepository<MealLog, UUID> {
    List<MealLog> findByUserId(UUID userId);
    List<MealLog> findByUserIdAndDate(UUID userId, LocalDate date);
}

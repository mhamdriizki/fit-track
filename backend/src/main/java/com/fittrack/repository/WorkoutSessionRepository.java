package com.fittrack.repository;

import com.fittrack.model.WorkoutSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, UUID> {
    List<WorkoutSession> findByUserId(UUID userId);
    List<WorkoutSession> findByUserIdAndDate(UUID userId, LocalDate date);
}

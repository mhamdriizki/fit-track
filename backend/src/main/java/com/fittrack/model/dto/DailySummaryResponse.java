package com.fittrack.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class DailySummaryResponse {
    private UUID userId;
    private LocalDate date;
    
    // User Goals
    private Double currentWeight;
    private Double targetWeight;
    
    // Workout Stats
    private Integer totalWorkoutDurationMinutes;
    private Integer totalWorkouts;
    
    // Diet Stats
    private Double totalCaloriesConsumed;
    private Double totalProtein;
    private Double totalCarbs;
    private Double totalFat;
}

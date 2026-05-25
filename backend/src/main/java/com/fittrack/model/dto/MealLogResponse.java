package com.fittrack.model.dto;

import com.fittrack.model.enums.MealType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class MealLogResponse {
    private UUID id;
    private UUID userId;
    private LocalDate date;
    private MealType mealType;
    private Double totalCalories;
    private Double totalProtein;
    private Double totalCarbs;
    private Double totalFat;
    private List<MealLogItemResponse> items;
    private LocalDateTime createdAt;
}

package com.fittrack.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class MealLogItemResponse {
    private UUID id;
    private FoodResponse food;
    private Double servings;
    private Double calories;
    private Double protein;
    private Double carbs;
    private Double fat;
}

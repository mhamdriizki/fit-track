package com.fittrack.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class MealLogItemRequest {
    private UUID foodId;
    private Double servings;
}

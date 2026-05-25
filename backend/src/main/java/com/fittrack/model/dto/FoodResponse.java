package com.fittrack.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class FoodResponse {
    private UUID id;
    private String name;
    private Double calories;
    private Double protein;
    private Double carbs;
    private Double fat;
    private String servingSize;
}

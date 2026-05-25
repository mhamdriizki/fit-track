package com.fittrack.model.dto;

import lombok.Data;

@Data
public class FoodCreateRequest {
    private String name;
    private Double calories;
    private Double protein;
    private Double carbs;
    private Double fat;
    private String servingSize;
}

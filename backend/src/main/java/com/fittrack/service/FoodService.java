package com.fittrack.service;

import com.fittrack.model.dto.FoodCreateRequest;
import com.fittrack.model.dto.FoodResponse;

import java.util.List;
import java.util.UUID;

public interface FoodService {
    FoodResponse createFood(FoodCreateRequest request);
    FoodResponse getFoodById(UUID id);
    List<FoodResponse> getAllFoods();
    void deleteFood(UUID id);
}

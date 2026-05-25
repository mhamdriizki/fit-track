package com.fittrack.service;

import com.fittrack.model.dto.MealLogCreateRequest;
import com.fittrack.model.dto.MealLogResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface DietService {
    MealLogResponse createMealLog(MealLogCreateRequest request);
    MealLogResponse getMealLogById(UUID id);
    List<MealLogResponse> getMealLogsByUserAndDate(UUID userId, LocalDate date);
    void deleteMealLog(UUID id);
}

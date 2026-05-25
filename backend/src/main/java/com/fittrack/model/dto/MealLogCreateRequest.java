package com.fittrack.model.dto;

import com.fittrack.model.enums.MealType;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
public class MealLogCreateRequest {
    private UUID userId;
    private LocalDate date;
    private MealType mealType;
    private List<MealLogItemRequest> items;
}

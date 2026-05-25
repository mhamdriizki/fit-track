package com.fittrack.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class ExerciseResponse {
    private UUID id;
    private String name;
    private String muscleGroup;
    private String description;
}

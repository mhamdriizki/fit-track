package com.fittrack.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class WorkoutLogResponse {
    private UUID id;
    private ExerciseResponse exercise;
    private Integer sets;
    private Integer reps;
    private Double weight;
}

package com.fittrack.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class WorkoutLogRequest {
    private UUID exerciseId;
    private Integer sets;
    private Integer reps;
    private Double weight;
}

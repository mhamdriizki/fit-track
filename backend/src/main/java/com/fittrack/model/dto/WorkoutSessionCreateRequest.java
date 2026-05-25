package com.fittrack.model.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
public class WorkoutSessionCreateRequest {
    private UUID userId;
    private LocalDate date;
    private Integer durationMinutes;
    private String notes;
    private List<WorkoutLogRequest> logs;
}

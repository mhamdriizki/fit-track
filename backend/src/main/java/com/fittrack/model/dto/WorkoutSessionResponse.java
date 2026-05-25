package com.fittrack.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class WorkoutSessionResponse {
    private UUID id;
    private UUID userId;
    private LocalDate date;
    private Integer durationMinutes;
    private String notes;
    private List<WorkoutLogResponse> logs;
    private LocalDateTime createdAt;
}

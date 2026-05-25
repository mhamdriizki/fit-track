package com.fittrack.service;

import com.fittrack.model.dto.WorkoutSessionCreateRequest;
import com.fittrack.model.dto.WorkoutSessionResponse;

import java.util.List;
import java.util.UUID;

public interface WorkoutService {
    WorkoutSessionResponse createWorkoutSession(WorkoutSessionCreateRequest request);
    WorkoutSessionResponse getWorkoutSessionById(UUID id);
    List<WorkoutSessionResponse> getWorkoutSessionsByUser(UUID userId);
    void deleteWorkoutSession(UUID id);
}

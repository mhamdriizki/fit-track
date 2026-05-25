package com.fittrack.service;

import com.fittrack.model.dto.ExerciseCreateRequest;
import com.fittrack.model.dto.ExerciseResponse;

import java.util.List;
import java.util.UUID;

public interface ExerciseService {
    ExerciseResponse createExercise(ExerciseCreateRequest request);
    ExerciseResponse getExerciseById(UUID id);
    List<ExerciseResponse> getAllExercises();
    void deleteExercise(UUID id);
}

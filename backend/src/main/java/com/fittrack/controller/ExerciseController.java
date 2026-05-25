package com.fittrack.controller;

import com.fittrack.model.dto.ExerciseCreateRequest;
import com.fittrack.model.dto.ExerciseResponse;
import com.fittrack.service.ExerciseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/exercises")
@RequiredArgsConstructor
@Tag(name = "Exercise Management", description = "APIs for managing exercise catalog in FitTrack")
public class ExerciseController {

    private final ExerciseService exerciseService;

    @PostMapping
    @Operation(summary = "Create an exercise", description = "Adds a new exercise to the catalog.")
    public ResponseEntity<ExerciseResponse> createExercise(@RequestBody ExerciseCreateRequest request) {
        return new ResponseEntity<>(exerciseService.createExercise(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get exercise by ID", description = "Retrieves an exercise by its UUID.")
    public ResponseEntity<ExerciseResponse> getExerciseById(@PathVariable UUID id) {
        return ResponseEntity.ok(exerciseService.getExerciseById(id));
    }

    @GetMapping
    @Operation(summary = "Get all exercises", description = "Retrieves a list of all available exercises.")
    public ResponseEntity<List<ExerciseResponse>> getAllExercises() {
        return ResponseEntity.ok(exerciseService.getAllExercises());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an exercise", description = "Deletes an exercise from the catalog.")
    public ResponseEntity<Void> deleteExercise(@PathVariable UUID id) {
        exerciseService.deleteExercise(id);
        return ResponseEntity.noContent().build();
    }
}

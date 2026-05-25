package com.fittrack.controller;

import com.fittrack.model.dto.WorkoutSessionCreateRequest;
import com.fittrack.model.dto.WorkoutSessionResponse;
import com.fittrack.service.WorkoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/workouts")
@RequiredArgsConstructor
@Tag(name = "Workout Tracker", description = "APIs for managing workout sessions and logs")
public class WorkoutController {

    private final WorkoutService workoutService;

    @PostMapping
    @Operation(summary = "Create a workout session", description = "Logs a new workout session with detailed exercises.")
    public ResponseEntity<WorkoutSessionResponse> createWorkoutSession(@RequestBody WorkoutSessionCreateRequest request) {
        return new ResponseEntity<>(workoutService.createWorkoutSession(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get workout session by ID", description = "Retrieves a specific workout session details.")
    public ResponseEntity<WorkoutSessionResponse> getWorkoutSessionById(@PathVariable UUID id) {
        return ResponseEntity.ok(workoutService.getWorkoutSessionById(id));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get workout sessions by user", description = "Retrieves all workout sessions logged by a specific user.")
    public ResponseEntity<List<WorkoutSessionResponse>> getWorkoutSessionsByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(workoutService.getWorkoutSessionsByUser(userId));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete workout session", description = "Deletes a workout session and its associated logs.")
    public ResponseEntity<Void> deleteWorkoutSession(@PathVariable UUID id) {
        workoutService.deleteWorkoutSession(id);
        return ResponseEntity.noContent().build();
    }
}

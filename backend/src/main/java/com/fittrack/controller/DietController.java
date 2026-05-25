package com.fittrack.controller;

import com.fittrack.model.dto.MealLogCreateRequest;
import com.fittrack.model.dto.MealLogResponse;
import com.fittrack.service.DietService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/diets")
@RequiredArgsConstructor
@Tag(name = "Diet & Nutrition Tracker", description = "APIs for managing meal logs and calories calculation")
public class DietController {

    private final DietService dietService;

    @PostMapping
    @Operation(summary = "Create a meal log", description = "Logs a meal and automatically calculates total macros.")
    public ResponseEntity<MealLogResponse> createMealLog(@RequestBody MealLogCreateRequest request) {
        return new ResponseEntity<>(dietService.createMealLog(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get meal log by ID", description = "Retrieves a specific meal log details.")
    public ResponseEntity<MealLogResponse> getMealLogById(@PathVariable UUID id) {
        return ResponseEntity.ok(dietService.getMealLogById(id));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get meal logs by user and date", description = "Retrieves all meal logs for a specific user on a given date.")
    public ResponseEntity<List<MealLogResponse>> getMealLogsByUserAndDate(
            @PathVariable UUID userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(dietService.getMealLogsByUserAndDate(userId, date));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete meal log", description = "Deletes a meal log and its associated items.")
    public ResponseEntity<Void> deleteMealLog(@PathVariable UUID id) {
        dietService.deleteMealLog(id);
        return ResponseEntity.noContent().build();
    }
}

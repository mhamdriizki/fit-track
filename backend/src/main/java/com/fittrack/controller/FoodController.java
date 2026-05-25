package com.fittrack.controller;

import com.fittrack.model.dto.FoodCreateRequest;
import com.fittrack.model.dto.FoodResponse;
import com.fittrack.service.FoodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/foods")
@RequiredArgsConstructor
@Tag(name = "Food Catalog", description = "APIs for managing food catalog with macros")
public class FoodController {

    private final FoodService foodService;

    @PostMapping
    @Operation(summary = "Create a food item", description = "Adds a new food to the catalog.")
    public ResponseEntity<FoodResponse> createFood(@RequestBody FoodCreateRequest request) {
        return new ResponseEntity<>(foodService.createFood(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get food by ID", description = "Retrieves a food item by its UUID.")
    public ResponseEntity<FoodResponse> getFoodById(@PathVariable UUID id) {
        return ResponseEntity.ok(foodService.getFoodById(id));
    }

    @GetMapping
    @Operation(summary = "Get all foods", description = "Retrieves a list of all available foods in the catalog.")
    public ResponseEntity<List<FoodResponse>> getAllFoods() {
        return ResponseEntity.ok(foodService.getAllFoods());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a food item", description = "Deletes a food from the catalog.")
    public ResponseEntity<Void> deleteFood(@PathVariable UUID id) {
        foodService.deleteFood(id);
        return ResponseEntity.noContent().build();
    }
}

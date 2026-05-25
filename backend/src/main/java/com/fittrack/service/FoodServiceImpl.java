package com.fittrack.service;

import com.fittrack.exception.DuplicateResourceException;
import com.fittrack.exception.ResourceNotFoundException;
import com.fittrack.model.Food;
import com.fittrack.model.dto.FoodCreateRequest;
import com.fittrack.model.dto.FoodResponse;
import com.fittrack.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;

    @Override
    public FoodResponse createFood(FoodCreateRequest request) {
        if (foodRepository.existsByNameIgnoreCase(request.getName())) {
            throw new DuplicateResourceException("Food with this name already exists");
        }

        Food food = Food.builder()
                .name(request.getName())
                .calories(request.getCalories())
                .protein(request.getProtein())
                .carbs(request.getCarbs())
                .fat(request.getFat())
                .servingSize(request.getServingSize())
                .build();

        Food savedFood = foodRepository.save(food);
        return mapToResponse(savedFood);
    }

    @Override
    public FoodResponse getFoodById(UUID id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found"));
        return mapToResponse(food);
    }

    @Override
    public List<FoodResponse> getAllFoods() {
        return foodRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFood(UUID id) {
        if (!foodRepository.existsById(id)) {
            throw new ResourceNotFoundException("Food not found");
        }
        foodRepository.deleteById(id);
    }

    private FoodResponse mapToResponse(Food food) {
        return FoodResponse.builder()
                .id(food.getId())
                .name(food.getName())
                .calories(food.getCalories())
                .protein(food.getProtein())
                .carbs(food.getCarbs())
                .fat(food.getFat())
                .servingSize(food.getServingSize())
                .build();
    }
}

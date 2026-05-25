package com.fittrack.service;

import com.fittrack.exception.ResourceNotFoundException;
import com.fittrack.model.Food;
import com.fittrack.model.MealLog;
import com.fittrack.model.MealLogItem;
import com.fittrack.model.dto.FoodResponse;
import com.fittrack.model.dto.MealLogCreateRequest;
import com.fittrack.model.dto.MealLogItemRequest;
import com.fittrack.model.dto.MealLogItemResponse;
import com.fittrack.model.dto.MealLogResponse;
import com.fittrack.repository.FoodRepository;
import com.fittrack.repository.MealLogRepository;
import com.fittrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DietServiceImpl implements DietService {

    private final MealLogRepository mealLogRepository;
    private final FoodRepository foodRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public MealLogResponse createMealLog(MealLogCreateRequest request) {
        if (!userRepository.existsById(request.getUserId())) {
            throw new ResourceNotFoundException("User not found");
        }

        MealLog mealLog = MealLog.builder()
                .userId(request.getUserId())
                .date(request.getDate())
                .mealType(request.getMealType())
                .totalCalories(0.0)
                .totalProtein(0.0)
                .totalCarbs(0.0)
                .totalFat(0.0)
                .build();

        double totalCalories = 0.0;
        double totalProtein = 0.0;
        double totalCarbs = 0.0;
        double totalFat = 0.0;

        if (request.getItems() != null) {
            for (MealLogItemRequest itemReq : request.getItems()) {
                Food food = foodRepository.findById(itemReq.getFoodId())
                        .orElseThrow(() -> new ResourceNotFoundException("Food not found: " + itemReq.getFoodId()));

                double servings = itemReq.getServings();
                double itemCalories = food.getCalories() * servings;
                double itemProtein = food.getProtein() * servings;
                double itemCarbs = food.getCarbs() * servings;
                double itemFat = food.getFat() * servings;

                MealLogItem item = MealLogItem.builder()
                        .food(food)
                        .servings(servings)
                        .calories(itemCalories)
                        .protein(itemProtein)
                        .carbs(itemCarbs)
                        .fat(itemFat)
                        .build();

                mealLog.addItem(item);

                totalCalories += itemCalories;
                totalProtein += itemProtein;
                totalCarbs += itemCarbs;
                totalFat += itemFat;
            }
        }

        mealLog.setTotalCalories(totalCalories);
        mealLog.setTotalProtein(totalProtein);
        mealLog.setTotalCarbs(totalCarbs);
        mealLog.setTotalFat(totalFat);

        MealLog savedLog = mealLogRepository.save(mealLog);
        return mapToResponse(savedLog);
    }

    @Override
    public MealLogResponse getMealLogById(UUID id) {
        MealLog log = mealLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meal log not found"));
        return mapToResponse(log);
    }

    @Override
    public List<MealLogResponse> getMealLogsByUserAndDate(UUID userId, LocalDate date) {
        return mealLogRepository.findByUserIdAndDate(userId, date).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteMealLog(UUID id) {
        if (!mealLogRepository.existsById(id)) {
            throw new ResourceNotFoundException("Meal log not found");
        }
        mealLogRepository.deleteById(id);
    }

    private MealLogResponse mapToResponse(MealLog log) {
        List<MealLogItemResponse> itemResponses = log.getItems().stream().map(item -> MealLogItemResponse.builder()
                .id(item.getId())
                .food(FoodResponse.builder()
                        .id(item.getFood().getId())
                        .name(item.getFood().getName())
                        .calories(item.getFood().getCalories())
                        .protein(item.getFood().getProtein())
                        .carbs(item.getFood().getCarbs())
                        .fat(item.getFood().getFat())
                        .servingSize(item.getFood().getServingSize())
                        .build())
                .servings(item.getServings())
                .calories(item.getCalories())
                .protein(item.getProtein())
                .carbs(item.getCarbs())
                .fat(item.getFat())
                .build()).collect(Collectors.toList());

        return MealLogResponse.builder()
                .id(log.getId())
                .userId(log.getUserId())
                .date(log.getDate())
                .mealType(log.getMealType())
                .totalCalories(log.getTotalCalories())
                .totalProtein(log.getTotalProtein())
                .totalCarbs(log.getTotalCarbs())
                .totalFat(log.getTotalFat())
                .items(itemResponses)
                .createdAt(log.getCreatedAt())
                .build();
    }
}

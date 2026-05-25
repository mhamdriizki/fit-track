package com.fittrack.service;

import com.fittrack.model.Food;
import com.fittrack.model.MealLog;
import com.fittrack.model.dto.MealLogCreateRequest;
import com.fittrack.model.dto.MealLogItemRequest;
import com.fittrack.model.dto.MealLogResponse;
import com.fittrack.model.enums.MealType;
import com.fittrack.repository.FoodRepository;
import com.fittrack.repository.MealLogRepository;
import com.fittrack.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DietServiceImplTest {

    @Mock
    private MealLogRepository mealLogRepository;
    @Mock
    private FoodRepository foodRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private DietServiceImpl dietService;

    private UUID userId;
    private UUID foodId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        foodId = UUID.randomUUID();
    }

    @Test
    void createMealLog_WithItems_CalculatesMacrosCorrectly() {
        // Arrange
        MealLogItemRequest itemRequest = new MealLogItemRequest();
        itemRequest.setFoodId(foodId);
        itemRequest.setServings(1.5);

        MealLogCreateRequest request = new MealLogCreateRequest();
        request.setUserId(userId);
        request.setDate(LocalDate.now());
        request.setMealType(MealType.LUNCH);
        request.setItems(List.of(itemRequest));

        Food mockFood = Food.builder()
                .id(foodId)
                .name("Chicken Breast")
                .calories(165.0)
                .protein(31.0)
                .carbs(0.0)
                .fat(3.6)
                .servingSize("100g")
                .build();

        when(userRepository.existsById(userId)).thenReturn(true);
        when(foodRepository.findById(foodId)).thenReturn(Optional.of(mockFood));
        
        // Mock the save operation to just return the passed entity
        when(mealLogRepository.save(any(MealLog.class))).thenAnswer(invocation -> {
            MealLog log = invocation.getArgument(0);
            log.setId(UUID.randomUUID());
            return log;
        });

        // Act
        MealLogResponse response = dietService.createMealLog(request);

        // Assert
        assertNotNull(response);
        // 165 * 1.5 = 247.5
        assertEquals(247.5, response.getTotalCalories());
        // 31 * 1.5 = 46.5
        assertEquals(46.5, response.getTotalProtein());
        // 0 * 1.5 = 0
        assertEquals(0.0, response.getTotalCarbs());
        // 3.6 * 1.5 = 5.4
        // Adding delta for floating point comparison
        assertEquals(5.4, response.getTotalFat(), 0.001);
        
        verify(mealLogRepository, times(1)).save(any(MealLog.class));
    }
}

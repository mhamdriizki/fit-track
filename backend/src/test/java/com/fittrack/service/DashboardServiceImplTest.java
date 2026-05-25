package com.fittrack.service;

import com.fittrack.model.MealLog;
import com.fittrack.model.User;
import com.fittrack.model.WorkoutSession;
import com.fittrack.model.dto.DailySummaryResponse;
import com.fittrack.repository.MealLogRepository;
import com.fittrack.repository.UserRepository;
import com.fittrack.repository.WorkoutSessionRepository;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DashboardServiceImplTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private WorkoutSessionRepository workoutSessionRepository;
    @Mock
    private MealLogRepository mealLogRepository;

    @InjectMocks
    private DashboardServiceImpl dashboardService;

    private UUID userId;
    private LocalDate testDate;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        testDate = LocalDate.now();
    }

    @Test
    void getDailySummary_Success() {
        // Mock User
        User user = User.builder()
                .id(userId)
                .currentWeight(70.0)
                .targetWeight(65.0)
                .build();

        // Mock Workouts
        WorkoutSession w1 = WorkoutSession.builder().durationMinutes(30).build();
        WorkoutSession w2 = WorkoutSession.builder().durationMinutes(45).build();
        
        // Mock Meals
        MealLog m1 = MealLog.builder()
                .totalCalories(500.0)
                .totalProtein(30.0)
                .totalCarbs(50.0)
                .totalFat(15.0)
                .build();
                
        MealLog m2 = MealLog.builder()
                .totalCalories(300.0)
                .totalProtein(20.0)
                .totalCarbs(30.0)
                .totalFat(10.0)
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(workoutSessionRepository.findByUserIdAndDate(userId, testDate)).thenReturn(List.of(w1, w2));
        when(mealLogRepository.findByUserIdAndDate(userId, testDate)).thenReturn(List.of(m1, m2));

        DailySummaryResponse summary = dashboardService.getDailySummary(userId, testDate);

        assertNotNull(summary);
        assertEquals(70.0, summary.getCurrentWeight());
        assertEquals(65.0, summary.getTargetWeight());
        assertEquals(75, summary.getTotalWorkoutDurationMinutes());
        assertEquals(2, summary.getTotalWorkouts());
        assertEquals(800.0, summary.getTotalCaloriesConsumed());
        assertEquals(50.0, summary.getTotalProtein());
        assertEquals(80.0, summary.getTotalCarbs());
        assertEquals(25.0, summary.getTotalFat());
    }
}

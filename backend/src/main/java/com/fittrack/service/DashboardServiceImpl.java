package com.fittrack.service;

import com.fittrack.exception.ResourceNotFoundException;
import com.fittrack.model.MealLog;
import com.fittrack.model.User;
import com.fittrack.model.WorkoutSession;
import com.fittrack.model.dto.DailySummaryResponse;
import com.fittrack.repository.MealLogRepository;
import com.fittrack.repository.UserRepository;
import com.fittrack.repository.WorkoutSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final WorkoutSessionRepository workoutSessionRepository;
    private final MealLogRepository mealLogRepository;

    @Override
    public DailySummaryResponse getDailySummary(UUID userId, LocalDate date) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<WorkoutSession> workouts = workoutSessionRepository.findByUserIdAndDate(userId, date);
        List<MealLog> meals = mealLogRepository.findByUserIdAndDate(userId, date);

        int totalWorkoutDuration = 0;
        for (WorkoutSession session : workouts) {
            if (session.getDurationMinutes() != null) {
                totalWorkoutDuration += session.getDurationMinutes();
            }
        }

        double totalCalories = 0.0;
        double totalProtein = 0.0;
        double totalCarbs = 0.0;
        double totalFat = 0.0;

        for (MealLog meal : meals) {
            totalCalories += meal.getTotalCalories();
            totalProtein += meal.getTotalProtein();
            totalCarbs += meal.getTotalCarbs();
            totalFat += meal.getTotalFat();
        }

        return DailySummaryResponse.builder()
                .userId(userId)
                .date(date)
                .currentWeight(user.getCurrentWeight())
                .targetWeight(user.getTargetWeight())
                .totalWorkoutDurationMinutes(totalWorkoutDuration)
                .totalWorkouts(workouts.size())
                .totalCaloriesConsumed(totalCalories)
                .totalProtein(totalProtein)
                .totalCarbs(totalCarbs)
                .totalFat(totalFat)
                .build();
    }
}

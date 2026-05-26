package com.fittrack.config;

import com.fittrack.model.Exercise;
import com.fittrack.model.Food;
import com.fittrack.model.User;
import com.fittrack.model.enums.Role;
import com.fittrack.repository.ExerciseRepository;
import com.fittrack.repository.UserRepository;
import com.fittrack.repository.FoodRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initData(ExerciseRepository exerciseRepository, UserRepository userRepository, FoodRepository foodRepository, JdbcTemplate jdbcTemplate, PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed a default user if none exists (for development)
            if (userRepository.count() == 0) {
                jdbcTemplate.update(
                    "INSERT INTO users (id, username, email, password_hash, current_weight, target_weight, role, created_at, updated_at) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
                    UUID.fromString("d290f1ee-6c54-4b01-90e6-d701748f0851"),
                    "johndoe",
                    "john@example.com",
                    passwordEncoder.encode("password"),
                    75.5,
                    70.0,
                    "USER"
                );
                System.out.println("Seeded default User.");
            }

            // Seed exercises if none exists
            if (exerciseRepository.count() == 0) {
                Exercise pushUp = Exercise.builder()
                        .name("Push Up")
                        .muscleGroup("Chest")
                        .description("Bodyweight chest exercise")
                        .build();

                Exercise squat = Exercise.builder()
                        .name("Barbell Squat")
                        .muscleGroup("Legs")
                        .description("Lower body compound movement")
                        .build();

                Exercise pullUp = Exercise.builder()
                        .name("Pull Up")
                        .muscleGroup("Back")
                        .description("Bodyweight back exercise")
                        .build();

                Exercise deadlift = Exercise.builder()
                        .name("Deadlift")
                        .muscleGroup("Back/Legs")
                        .description("Full body compound movement")
                        .build();

                exerciseRepository.saveAll(List.of(pushUp, squat, pullUp, deadlift));
                System.out.println("Seeded default Exercises.");
            }

            // Seed foods if none exists
            if (foodRepository.count() == 0) {
                Food chicken = Food.builder()
                        .name("Chicken Breast")
                        .calories(165.0)
                        .protein(31.0)
                        .carbs(0.0)
                        .fat(3.6)
                        .servingSize("100g")
                        .build();

                Food rice = Food.builder()
                        .name("White Rice")
                        .calories(130.0)
                        .protein(2.7)
                        .carbs(28.0)
                        .fat(0.3)
                        .servingSize("100g")
                        .build();

                Food broccoli = Food.builder()
                        .name("Broccoli")
                        .calories(55.0)
                        .protein(3.7)
                        .carbs(11.2)
                        .fat(0.6)
                        .servingSize("1 cup")
                        .build();

                Food egg = Food.builder()
                        .name("Whole Egg")
                        .calories(78.0)
                        .protein(6.3)
                        .carbs(0.6)
                        .fat(5.3)
                        .servingSize("1 large")
                        .build();

                foodRepository.saveAll(List.of(chicken, rice, broccoli, egg));
                System.out.println("Seeded default Foods.");
            }
        };
    }
}

package com.fittrack.config;

import com.fittrack.model.Exercise;
import com.fittrack.model.User;
import com.fittrack.model.enums.Role;
import com.fittrack.repository.ExerciseRepository;
import com.fittrack.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initData(ExerciseRepository exerciseRepository, UserRepository userRepository, JdbcTemplate jdbcTemplate) {
        return args -> {
            // Seed a default user if none exists (for development)
            if (userRepository.count() == 0) {
                jdbcTemplate.update(
                    "INSERT INTO users (id, username, email, password_hash, current_weight, target_weight, role, created_at, updated_at) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
                    UUID.fromString("d290f1ee-6c54-4b01-90e6-d701748f0851"),
                    "johndoe",
                    "john@example.com",
                    "hashed_password",
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
        };
    }
}

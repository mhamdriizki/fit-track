package com.fittrack.config;

import com.fittrack.model.Exercise;
import com.fittrack.model.User;
import com.fittrack.model.Role;
import com.fittrack.repository.ExerciseRepository;
import com.fittrack.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initData(ExerciseRepository exerciseRepository, UserRepository userRepository) {
        return args -> {
            // Seed a default user if none exists (for development)
            if (userRepository.count() == 0) {
                User defaultUser = User.builder()
                        .id(UUID.fromString("d290f1ee-6c54-4b01-90e6-d701748f0851"))
                        .username("johndoe")
                        .email("john@example.com")
                        .password("hashed_password") // mock
                        .currentWeight(75.5)
                        .targetWeight(70.0)
                        .role(Role.USER)
                        .createdAt(LocalDateTime.now())
                        .build();
                userRepository.save(defaultUser);
                System.out.println("Seeded default User.");
            }

            // Seed exercises if none exists
            if (exerciseRepository.count() == 0) {
                Exercise pushUp = Exercise.builder()
                        .name("Push Up")
                        .category("Chest")
                        .description("Bodyweight chest exercise")
                        .build();

                Exercise squat = Exercise.builder()
                        .name("Barbell Squat")
                        .category("Legs")
                        .description("Lower body compound movement")
                        .build();

                Exercise pullUp = Exercise.builder()
                        .name("Pull Up")
                        .category("Back")
                        .description("Bodyweight back exercise")
                        .build();

                Exercise deadlift = Exercise.builder()
                        .name("Deadlift")
                        .category("Back/Legs")
                        .description("Full body compound movement")
                        .build();

                exerciseRepository.saveAll(List.of(pushUp, squat, pullUp, deadlift));
                System.out.println("Seeded default Exercises.");
            }
        };
    }
}

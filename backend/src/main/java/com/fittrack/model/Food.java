package com.fittrack.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "foods")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private Double calories;

    @Column(nullable = false)
    private Double protein;

    @Column(nullable = false)
    private Double carbs;

    @Column(nullable = false)
    private Double fat;

    @Column(name = "serving_size", nullable = false, length = 50)
    private String servingSize; // e.g., "100g", "1 cup", "1 slice"

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}

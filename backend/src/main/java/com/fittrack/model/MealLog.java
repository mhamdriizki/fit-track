package com.fittrack.model;

import com.fittrack.model.enums.MealType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "meal_logs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MealLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(name = "meal_type", nullable = false)
    private MealType mealType;

    @Column(name = "total_calories")
    @Builder.Default
    private Double totalCalories = 0.0;

    @Column(name = "total_protein")
    @Builder.Default
    private Double totalProtein = 0.0;

    @Column(name = "total_carbs")
    @Builder.Default
    private Double totalCarbs = 0.0;

    @Column(name = "total_fat")
    @Builder.Default
    private Double totalFat = 0.0;

    @OneToMany(mappedBy = "mealLog", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MealLogItem> items = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public void addItem(MealLogItem item) {
        items.add(item);
        item.setMealLog(this);
    }

    public void removeItem(MealLogItem item) {
        items.remove(item);
        item.setMealLog(null);
    }
}

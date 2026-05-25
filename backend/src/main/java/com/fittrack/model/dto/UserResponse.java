package com.fittrack.model.dto;

import com.fittrack.model.enums.Role;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class UserResponse {
    private UUID id;
    private String username;
    private String email;
    private Double currentWeight;
    private Double targetWeight;
    private Role role;
    private LocalDateTime createdAt;
}

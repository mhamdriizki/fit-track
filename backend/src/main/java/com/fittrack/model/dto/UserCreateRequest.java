package com.fittrack.model.dto;

import lombok.Data;

@Data
public class UserCreateRequest {
    private String username;
    private String email;
    private String password;
    private Double currentWeight;
    private Double targetWeight;
}

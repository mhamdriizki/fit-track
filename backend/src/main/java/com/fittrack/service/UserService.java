package com.fittrack.service;

import com.fittrack.model.dto.UserCreateRequest;
import com.fittrack.model.dto.UserResponse;

import java.util.List;
import java.util.UUID;

public interface UserService {
    UserResponse createUser(UserCreateRequest request);
    UserResponse getUserById(UUID id);
    List<UserResponse> getAllUsers();
    void deleteUser(UUID id);
}

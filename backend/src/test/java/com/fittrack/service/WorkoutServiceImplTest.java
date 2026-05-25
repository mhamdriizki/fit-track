package com.fittrack.service;

import com.fittrack.model.Exercise;
import com.fittrack.model.WorkoutSession;
import com.fittrack.model.dto.WorkoutLogRequest;
import com.fittrack.model.dto.WorkoutSessionCreateRequest;
import com.fittrack.model.dto.WorkoutSessionResponse;
import com.fittrack.repository.ExerciseRepository;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WorkoutServiceImplTest {

    @Mock
    private WorkoutSessionRepository workoutSessionRepository;
    @Mock
    private ExerciseRepository exerciseRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private WorkoutServiceImpl workoutService;

    private UUID userId;
    private UUID exerciseId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        exerciseId = UUID.randomUUID();
    }

    @Test
    void createWorkoutSession_Success() {
        WorkoutLogRequest logRequest = new WorkoutLogRequest();
        logRequest.setExerciseId(exerciseId);
        logRequest.setSets(3);
        logRequest.setReps(10);
        logRequest.setWeight(50.0);

        WorkoutSessionCreateRequest request = new WorkoutSessionCreateRequest();
        request.setUserId(userId);
        request.setDate(LocalDate.now());
        request.setLogs(List.of(logRequest));

        Exercise exercise = Exercise.builder()
                .id(exerciseId)
                .name("Squat")
                .muscleGroup("Legs")
                .build();

        WorkoutSession mockSession = WorkoutSession.builder()
                .id(UUID.randomUUID())
                .userId(userId)
                .date(LocalDate.now())
                .build();

        when(userRepository.existsById(userId)).thenReturn(true);
        when(exerciseRepository.findById(exerciseId)).thenReturn(Optional.of(exercise));
        when(workoutSessionRepository.save(any(WorkoutSession.class))).thenReturn(mockSession);

        WorkoutSessionResponse response = workoutService.createWorkoutSession(request);

        assertNotNull(response);
        assertEquals(userId, response.getUserId());
        verify(workoutSessionRepository, times(1)).save(any(WorkoutSession.class));
    }
}

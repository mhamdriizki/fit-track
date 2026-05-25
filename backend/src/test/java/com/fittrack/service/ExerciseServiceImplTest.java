package com.fittrack.service;

import com.fittrack.exception.DuplicateResourceException;
import com.fittrack.model.Exercise;
import com.fittrack.model.dto.ExerciseCreateRequest;
import com.fittrack.model.dto.ExerciseResponse;
import com.fittrack.repository.ExerciseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExerciseServiceImplTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private ExerciseServiceImpl exerciseService;

    private Exercise mockExercise;

    @BeforeEach
    void setUp() {
        mockExercise = Exercise.builder()
                .id(UUID.randomUUID())
                .name("Push Up")
                .muscleGroup("Chest")
                .description("A classic bodyweight exercise")
                .build();
    }

    @Test
    void createExercise_Success() {
        ExerciseCreateRequest request = new ExerciseCreateRequest();
        request.setName("Push Up");
        request.setMuscleGroup("Chest");

        when(exerciseRepository.existsByNameIgnoreCase("Push Up")).thenReturn(false);
        when(exerciseRepository.save(any(Exercise.class))).thenReturn(mockExercise);

        ExerciseResponse response = exerciseService.createExercise(request);

        assertNotNull(response);
        assertEquals("Push Up", response.getName());
        verify(exerciseRepository, times(1)).save(any(Exercise.class));
    }

    @Test
    void createExercise_DuplicateName_ThrowsException() {
        ExerciseCreateRequest request = new ExerciseCreateRequest();
        request.setName("Push Up");

        when(exerciseRepository.existsByNameIgnoreCase("Push Up")).thenReturn(true);

        assertThrows(DuplicateResourceException.class, () -> exerciseService.createExercise(request));
        verify(exerciseRepository, never()).save(any(Exercise.class));
    }
}

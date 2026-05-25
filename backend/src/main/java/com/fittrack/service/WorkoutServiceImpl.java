package com.fittrack.service;

import com.fittrack.exception.ResourceNotFoundException;
import com.fittrack.model.Exercise;
import com.fittrack.model.WorkoutLog;
import com.fittrack.model.WorkoutSession;
import com.fittrack.model.dto.ExerciseResponse;
import com.fittrack.model.dto.WorkoutLogRequest;
import com.fittrack.model.dto.WorkoutLogResponse;
import com.fittrack.model.dto.WorkoutSessionCreateRequest;
import com.fittrack.model.dto.WorkoutSessionResponse;
import com.fittrack.repository.ExerciseRepository;
import com.fittrack.repository.UserRepository;
import com.fittrack.repository.WorkoutSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutSessionRepository workoutSessionRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public WorkoutSessionResponse createWorkoutSession(WorkoutSessionCreateRequest request) {
        // Validate user exists
        if (!userRepository.existsById(request.getUserId())) {
            throw new ResourceNotFoundException("User not found");
        }

        WorkoutSession session = WorkoutSession.builder()
                .userId(request.getUserId())
                .date(request.getDate())
                .durationMinutes(request.getDurationMinutes())
                .notes(request.getNotes())
                .build();

        if (request.getLogs() != null) {
            for (WorkoutLogRequest logReq : request.getLogs()) {
                Exercise exercise = exerciseRepository.findById(logReq.getExerciseId())
                        .orElseThrow(() -> new ResourceNotFoundException("Exercise not found"));

                WorkoutLog log = WorkoutLog.builder()
                        .exercise(exercise)
                        .sets(logReq.getSets())
                        .reps(logReq.getReps())
                        .weight(logReq.getWeight())
                        .build();

                session.addLog(log);
            }
        }

        WorkoutSession savedSession = workoutSessionRepository.save(session);
        return mapToResponse(savedSession);
    }

    @Override
    public WorkoutSessionResponse getWorkoutSessionById(UUID id) {
        WorkoutSession session = workoutSessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workout session not found"));
        return mapToResponse(session);
    }

    @Override
    public List<WorkoutSessionResponse> getWorkoutSessionsByUser(UUID userId) {
        return workoutSessionRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteWorkoutSession(UUID id) {
        if (!workoutSessionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Workout session not found");
        }
        workoutSessionRepository.deleteById(id);
    }

    private WorkoutSessionResponse mapToResponse(WorkoutSession session) {
        List<WorkoutLogResponse> logResponses = session.getLogs().stream().map(log -> WorkoutLogResponse.builder()
                .id(log.getId())
                .exercise(ExerciseResponse.builder()
                        .id(log.getExercise().getId())
                        .name(log.getExercise().getName())
                        .muscleGroup(log.getExercise().getMuscleGroup())
                        .description(log.getExercise().getDescription())
                        .build())
                .sets(log.getSets())
                .reps(log.getReps())
                .weight(log.getWeight())
                .build()).collect(Collectors.toList());

        return WorkoutSessionResponse.builder()
                .id(session.getId())
                .userId(session.getUserId())
                .date(session.getDate())
                .durationMinutes(session.getDurationMinutes())
                .notes(session.getNotes())
                .logs(logResponses)
                .createdAt(session.getCreatedAt())
                .build();
    }
}

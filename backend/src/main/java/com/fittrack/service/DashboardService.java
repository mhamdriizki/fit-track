package com.fittrack.service;

import com.fittrack.model.dto.DailySummaryResponse;

import java.time.LocalDate;
import java.util.UUID;

public interface DashboardService {
    DailySummaryResponse getDailySummary(UUID userId, LocalDate date);
}

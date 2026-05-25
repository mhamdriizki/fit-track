import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';
import { DailySummary } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="dashboard">
      <header class="page-header">
        <div>
          <h1>Welcome to FitTrack</h1>
          <p class="subtitle">Your personal fitness and nutrition companion.</p>
        </div>
        <div class="date-selector glass">
          <label for="datePicker">Select Date:</label>
          <input 
            type="date" 
            id="datePicker"
            class="form-control"
            [ngModel]="selectedDate" 
            (ngModelChange)="onDateChange($event)"
          />
        </div>
      </header>

      <div *ngIf="loading" class="loading">Loading your dashboard...</div>

      <div *ngIf="!loading && summary" class="dashboard-grid">
        <!-- Goal Progress Card -->
        <div class="glass card goal-card">
          <h2>Weight Goal</h2>
          <div class="weight-stats">
            <div class="stat">
              <span class="label">Current</span>
              <span class="value">{{ summary.currentWeight || '-' }} kg</span>
            </div>
            <div class="stat">
              <span class="label">Target</span>
              <span class="value">{{ summary.targetWeight || '-' }} kg</span>
            </div>
          </div>
          <div class="progress-container" *ngIf="summary.currentWeight && summary.targetWeight">
            <div class="progress-bar" [style.width.%]="getWeightProgress()"></div>
          </div>
          <p class="progress-text" *ngIf="summary.currentWeight && summary.targetWeight">
            {{ getWeightProgressText() }}
          </p>
        </div>

        <!-- Workout Summary Card -->
        <div class="glass card workout-card">
          <h2>Workout Summary</h2>
          <div class="workout-stats">
            <div class="circle-stat">
              <span class="value">{{ summary.totalWorkouts }}</span>
              <span class="label">Sessions</span>
            </div>
            <div class="circle-stat">
              <span class="value">{{ summary.totalWorkoutDurationMinutes }}</span>
              <span class="label">Minutes</span>
            </div>
          </div>
          <a routerLink="/workout" class="btn-secondary w-full text-center mt-4">Log Workout</a>
        </div>

        <!-- Nutrition Summary Card -->
        <div class="glass card nutrition-card">
          <h2>Nutrition Summary</h2>
          
          <div class="macro-row main-macro">
            <div class="macro-info">
              <span class="macro-name">Calories</span>
              <span class="macro-values">
                <strong>{{ summary.totalCaloriesConsumed | number:'1.0-0' }}</strong> / 2000 kcal
              </span>
            </div>
            <div class="macro-progress-bg">
              <div class="macro-progress cal-progress" [style.width.%]="getMacroProgress(summary.totalCaloriesConsumed, 2000)"></div>
            </div>
          </div>

          <div class="macros-grid">
            <div class="macro-row">
              <div class="macro-info">
                <span class="macro-name">Protein</span>
                <span class="macro-values">{{ summary.totalProtein | number:'1.0-0' }}g / 150g</span>
              </div>
              <div class="macro-progress-bg">
                <div class="macro-progress pro-progress" [style.width.%]="getMacroProgress(summary.totalProtein, 150)"></div>
              </div>
            </div>

            <div class="macro-row">
              <div class="macro-info">
                <span class="macro-name">Carbs</span>
                <span class="macro-values">{{ summary.totalCarbs | number:'1.0-0' }}g / 250g</span>
              </div>
              <div class="macro-progress-bg">
                <div class="macro-progress carb-progress" [style.width.%]="getMacroProgress(summary.totalCarbs, 250)"></div>
              </div>
            </div>

            <div class="macro-row">
              <div class="macro-info">
                <span class="macro-name">Fat</span>
                <span class="macro-values">{{ summary.totalFat | number:'1.0-0' }}g / 70g</span>
              </div>
              <div class="macro-progress-bg">
                <div class="macro-progress fat-progress" [style.width.%]="getMacroProgress(summary.totalFat, 70)"></div>
              </div>
            </div>
          </div>

          <a routerLink="/diet" class="btn-secondary w-full text-center mt-4">Log Meal</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      animation: fadeIn 0.5s ease-out;
      max-width: 1000px;
      margin: 0 auto;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .subtitle {
      color: var(--text-secondary);
    }
    .date-selector {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1.25rem;
      border-radius: var(--border-radius);
    }
    .date-selector label {
      font-weight: 500;
      color: var(--text-secondary);
    }
    .form-control {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid var(--border-color);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      color: var(--text-primary);
      font-family: inherit;
    }
    .loading {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .card {
      padding: 1.5rem;
      border-radius: var(--border-radius);
      display: flex;
      flex-direction: column;
    }
    .card h2 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: var(--color-primary);
    }

    /* Goal Stats */
    .weight-stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .stat .label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .stat .value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .progress-container {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.75rem;
    }
    .progress-bar {
      height: 100%;
      background: var(--gradient-primary);
      border-radius: 4px;
      transition: width 1s ease-out;
    }
    .progress-text {
      font-size: 0.875rem;
      color: var(--text-secondary);
      text-align: right;
    }

    /* Workout Stats */
    .workout-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 1.5rem;
      flex: 1;
    }
    .circle-stat {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid var(--color-secondary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(16, 185, 129, 0.05);
    }
    .circle-stat .value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
      margin-bottom: 0.25rem;
    }
    .circle-stat .label {
      font-size: 0.75rem;
      color: var(--text-secondary);
      text-transform: uppercase;
    }

    /* Nutrition Stats */
    .macro-row {
      margin-bottom: 1rem;
    }
    .macro-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }
    .macro-name {
      color: var(--text-secondary);
      font-weight: 500;
    }
    .macro-values {
      color: var(--text-primary);
    }
    .macro-progress-bg {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;
    }
    .macro-progress {
      height: 100%;
      border-radius: 3px;
      transition: width 1s ease-out;
    }
    .cal-progress { background: #3b82f6; }
    .pro-progress { background: #ef4444; }
    .carb-progress { background: #f59e0b; }
    .fat-progress { background: #8b5cf6; }

    .main-macro {
      background: rgba(0,0,0,0.2);
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }
    .main-macro .macro-info {
      font-size: 1rem;
    }
    .main-macro .macro-name {
      color: var(--text-primary);
      font-weight: 600;
    }
    .main-macro .macro-progress-bg {
      height: 8px;
    }

    /* Utils */
    .mt-4 { margin-top: 1rem; }
    .w-full { width: 100%; display: block; }
    .text-center { text-align: center; }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      padding: 0.75rem;
      border-radius: 8px;
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DashboardComponent implements OnInit {
  summary: DailySummary | null = null;
  loading = false;
  selectedDate: string;

  constructor(
    private dashboardService: DashboardService,
    private auth: AuthService
  ) {
    this.selectedDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.loadSummary();
  }

  onDateChange(newDate: string) {
    this.selectedDate = newDate;
    this.loadSummary();
  }

  loadSummary() {
    this.loading = true;
    const userId = this.auth.getCurrentUserId();
    this.dashboardService.getDailySummary(userId, this.selectedDate).subscribe({
      next: (data) => {
        this.summary = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard summary', err);
        this.loading = false;
      }
    });
  }

  getWeightProgress(): number {
    if (!this.summary?.currentWeight || !this.summary?.targetWeight) return 0;
    
    // Simple logic: Assuming starting weight is current + 10 (just for visual if we don't track start weight)
    // Actually, if we just want a percentage towards goal:
    const diff = Math.abs(this.summary.currentWeight - this.summary.targetWeight);
    if (diff === 0) return 100;
    // Just a placeholder visual: e.g. 10kg difference is 0%, 0kg is 100%
    const progress = Math.max(0, 100 - (diff * 10)); 
    return Math.min(100, progress);
  }

  getWeightProgressText(): string {
    if (!this.summary?.currentWeight || !this.summary?.targetWeight) return '';
    const diff = this.summary.currentWeight - this.summary.targetWeight;
    if (diff > 0) return `${diff.toFixed(1)} kg to lose`;
    if (diff < 0) return `${Math.abs(diff).toFixed(1)} kg to gain`;
    return 'Goal reached! 🎉';
  }

  getMacroProgress(current: number, target: number): number {
    if (!current || !target) return 0;
    return Math.min(100, (current / target) * 100);
  }
}

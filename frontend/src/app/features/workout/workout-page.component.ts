import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { ExerciseService } from '../../core/services/exercise.service';
import { WorkoutService } from '../../core/services/workout.service';
import { AuthService } from '../../core/services/auth.service';
import { Exercise, WorkoutSession, WorkoutSessionCreateRequest } from '../../core/models/workout.model';

@Component({
  selector: 'app-workout-page',
  standalone: true,
  imports: [CommonModule, WorkoutListComponent, WorkoutFormComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1>Workout Logger</h1>
          <p class="subtitle">Track your training sessions and progress.</p>
        </div>
        <button class="btn-primary" *ngIf="!showForm" (click)="toggleForm()">
          + New Workout
        </button>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-state">
        <p>Loading your fitness data...</p>
      </div>

      <!-- Main Content -->
      <div *ngIf="!loading">
        <!-- New Workout Form -->
        <app-workout-form 
          *ngIf="showForm" 
          [exercises]="exercises"
          (save)="onSaveWorkout($event)"
          (cancel)="toggleForm()">
        </app-workout-form>

        <!-- Workout History -->
        <div class="history-section">
          <h2>Recent Workouts</h2>
          <app-workout-list [workouts]="workouts"></app-workout-list>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      animation: fadeIn 0.4s ease-out;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .subtitle {
      color: var(--text-secondary);
    }
    .history-section h2 {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
    }
    .loading-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class WorkoutPageComponent implements OnInit {
  workouts: WorkoutSession[] = [];
  exercises: Exercise[] = [];
  showForm = false;
  loading = true;

  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    const userId = this.auth.getCurrentUserId();
    
    // Load exercises and workouts in parallel
    // Since we don't have forkJoin imported, we can just nest for simplicity or sequential
    this.exerciseService.getAllExercises().subscribe({
      next: (exercises) => {
        this.exercises = exercises;
        this.loadWorkouts(userId);
      },
      error: (err) => {
        console.error('Failed to load exercises', err);
        this.loading = false;
      }
    });
  }

  loadWorkouts(userId: string) {
    this.workoutService.getWorkoutsByUser(userId).subscribe({
      next: (workouts) => {
        // Map exercise names into the logs for display
        this.workouts = workouts.map(w => {
          w.logs = w.logs.map(l => {
            const ex = this.exercises.find(e => e.id === l.exerciseId);
            return { ...l, exerciseName: ex?.name || 'Unknown' };
          });
          return w;
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load workouts', err);
        this.loading = false;
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSaveWorkout(request: WorkoutSessionCreateRequest) {
    this.workoutService.createWorkout(request).subscribe({
      next: () => {
        this.showForm = false;
        this.loadWorkouts(this.auth.getCurrentUserId());
      },
      error: (err) => {
        console.error('Failed to save workout', err);
        alert('Failed to save workout. Please try again.');
      }
    });
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutSession } from '../../../../core/models/workout.model';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="workout-list">
      <div *ngIf="workouts.length === 0" class="empty-state glass">
        <p>No workouts recorded yet. Start logging your fitness journey!</p>
      </div>

      <div *ngFor="let session of workouts" class="workout-card glass">
        <div class="card-header">
          <h3>{{ session.date | date: 'mediumDate' }}</h3>
          <span class="duration">{{ session.durationMinutes }} min</span>
        </div>

        <p *ngIf="session.notes" class="notes">{{ session.notes }}</p>

        <div class="logs">
          <h4>Exercises</h4>
          <ul>
            <li *ngFor="let log of session.logs">
              <span class="exercise-name">{{
                log.exercise?.name || log.exerciseName || 'Unknown'
              }}</span>
              <span class="details"
                >{{ log.sets }} sets x {{ log.reps }} reps
                {{ log.weight }}kg</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .workout-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .empty-state {
        padding: 3rem;
        text-align: center;
        color: var(--text-secondary);
        border-radius: var(--border-radius);
      }
      .workout-card {
        padding: 1.5rem;
        border-radius: var(--border-radius);
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
      }
      .duration {
        background: var(--bg-main);
        color: var(--color-primary);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
      }
      .notes {
        color: var(--text-secondary);
        font-style: italic;
        margin-bottom: 1rem;
      }
      .logs h4 {
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--text-secondary);
        margin-bottom: 0.5rem;
      }
      .logs ul {
        list-style: none;
        padding: 0;
      }
      .logs li {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px dashed var(--border-color);

        &:last-child {
          border-bottom: none;
        }
      }
      .exercise-name {
        font-weight: 500;
      }
      .details {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    `,
  ],
})
export class WorkoutListComponent {
  @Input() workouts: WorkoutSession[] = [];
}

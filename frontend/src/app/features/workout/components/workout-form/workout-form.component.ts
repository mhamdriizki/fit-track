import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Exercise, WorkoutSessionCreateRequest } from '../../../../core/models/workout.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container glass">
      <div class="form-header">
        <h2>Log New Workout</h2>
        <button class="btn-close" (click)="cancel.emit()">&times;</button>
      </div>

      <form [formGroup]="workoutForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Date</label>
          <input type="date" formControlName="date" class="form-control" />
        </div>

        <div class="form-group">
          <label>Duration (minutes)</label>
          <input type="number" formControlName="durationMinutes" class="form-control" placeholder="e.g. 60" />
        </div>

        <div class="form-group">
          <label>Notes</label>
          <textarea formControlName="notes" class="form-control" rows="2" placeholder="How did it feel?"></textarea>
        </div>

        <div class="logs-section">
          <div class="logs-header">
            <h3>Exercises</h3>
            <button type="button" class="btn-secondary" (click)="addLog()">+ Add Exercise</button>
          </div>

          <div formArrayName="logs" class="logs-array">
            <div *ngFor="let log of logs.controls; let i=index" [formGroupName]="i" class="log-item">
              <div class="log-header">
                <span class="log-index">#{{ i + 1 }}</span>
                <button type="button" class="btn-remove" (click)="removeLog(i)">&times;</button>
              </div>
              
              <div class="log-grid">
                <div class="form-group">
                  <label>Exercise</label>
                  <select formControlName="exerciseId" class="form-control">
                    <option value="" disabled>Select Exercise</option>
                    <option *ngFor="let ex of exercises" [value]="ex.id">{{ ex.name }} ({{ ex.muscleGroup }})</option>
                  </select>
                </div>
                
                <div class="form-group-row">
                  <div class="form-group">
                    <label>Sets</label>
                    <input type="number" formControlName="sets" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label>Reps</label>
                    <input type="number" formControlName="reps" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label>Weight (kg)</label>
                    <input type="number" formControlName="weight" class="form-control" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="cancel.emit()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="workoutForm.invalid || logs.length === 0">
            Save Workout
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      padding: 2rem;
      border-radius: var(--border-radius);
      margin-bottom: 2rem;
      animation: slideDown 0.3s ease-out;
    }
    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .btn-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--text-secondary);
      cursor: pointer;
      &:hover { color: var(--color-secondary); }
    }
    .form-group {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
    }
    .form-group label {
      font-weight: 500;
      font-size: 0.875rem;
    }
    .form-control {
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      background: var(--bg-surface);
      color: var(--text-primary);
      font-family: inherit;
      transition: border-color 0.2s;
      
      &:focus {
        outline: none;
        border-color: var(--color-primary);
      }
    }
    .logs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 2rem 0 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
    .btn-secondary {
      background: rgba(16, 185, 129, 0.1);
      color: var(--color-primary);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      &:hover { background: rgba(99, 102, 241, 0.2); }
    }
    .logs-array {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .log-item {
      background: rgba(0,0,0,0.02);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
    }
    .log-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    .log-index {
      font-weight: 600;
      color: var(--color-primary);
    }
    .btn-remove {
      background: none;
      border: none;
      color: var(--color-secondary);
      cursor: pointer;
      font-size: 1.25rem;
      line-height: 1;
    }
    .form-group-row {
      display: flex;
      gap: 1rem;
    }
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
    .btn-cancel {
      background: none;
      border: 1px solid var(--border-color);
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      color: var(--text-primary);
      cursor: pointer;
      &:hover { background: rgba(0,0,0,0.05); }
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class WorkoutFormComponent implements OnInit {
  @Input() exercises: Exercise[] = [];
  @Output() save = new EventEmitter<WorkoutSessionCreateRequest>();
  @Output() cancel = new EventEmitter<void>();

  workoutForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.workoutForm = this.fb.group({
      date: [new Date().toISOString().split('T')[0], Validators.required],
      durationMinutes: ['', [Validators.required, Validators.min(1)]],
      notes: [''],
      logs: this.fb.array([])
    });
  }

  ngOnInit() {
    this.addLog(); // Add first empty log by default
  }

  get logs() {
    return this.workoutForm.get('logs') as FormArray;
  }

  addLog() {
    const logForm = this.fb.group({
      exerciseId: ['', Validators.required],
      sets: [3, [Validators.required, Validators.min(1)]],
      reps: [10, [Validators.required, Validators.min(1)]],
      weight: [0, [Validators.required, Validators.min(0)]]
    });
    this.logs.push(logForm);
  }

  removeLog(index: number) {
    this.logs.removeAt(index);
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      const request: WorkoutSessionCreateRequest = {
        userId: this.auth.getCurrentUserId(),
        ...this.workoutForm.value
      };
      this.save.emit(request);
    }
  }
}

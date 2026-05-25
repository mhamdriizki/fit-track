import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Food, MealLogCreateRequest } from '../../../../core/models/diet.model';

@Component({
  selector: 'app-diet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="diet-form glass">
      <div class="form-header">
        <h3>Log New Meal</h3>
        <button class="btn-close" (click)="onCancel()">×</button>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-row">
          <div class="form-group">
            <label>Date</label>
            <input type="date" formControlName="date" class="form-control" />
          </div>
          <div class="form-group">
            <label>Meal Type</label>
            <select formControlName="mealType" class="form-control">
              <option value="BREAKFAST">Breakfast</option>
              <option value="LUNCH">Lunch</option>
              <option value="DINNER">Dinner</option>
              <option value="SNACK">Snack</option>
            </select>
          </div>
        </div>

        <div class="foods-section">
          <div class="section-header">
            <h4>Foods</h4>
            <button type="button" class="btn-secondary small" (click)="addFoodItem()">+ Add Food</button>
          </div>

          <div formArrayName="items" class="food-items">
            <div
              *ngFor="let item of items.controls; let i = index"
              [formGroupName]="i"
              class="food-item-row"
            >
              <span class="index">#{{ i + 1 }}</span>
              
              <div class="form-group select-group">
                <label>Food</label>
                <select formControlName="foodId" class="form-control">
                  <option value="" disabled>Select Food</option>
                  <option *ngFor="let food of availableFoods" [value]="food.id">
                    {{ food.name }} ({{ food.servingSize }})
                  </option>
                </select>
              </div>

              <div class="form-group input-group">
                <label>Servings</label>
                <input type="number" formControlName="servings" min="0.1" step="0.1" class="form-control" />
              </div>

              <button *ngIf="items.length > 1" type="button" class="btn-icon delete" (click)="removeFoodItem(i)">
                ×
              </button>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" (click)="onCancel()">Cancel</button>
          <button type="submit" class="btn-primary" [disabled]="form.invalid">Save Meal</button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .diet-form {
        padding: 2rem;
        border-radius: var(--border-radius);
        margin-bottom: 2rem;
        animation: slideDown 0.3s ease-out;
      }
      .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }
      .form-header h3 {
        color: var(--text-primary);
        font-size: 1.5rem;
      }
      .btn-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        line-height: 1;
        transition: color 0.2s;

        &:hover {
          color: var(--accent-color);
        }
      }
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      label {
        font-size: 0.875rem;
        color: var(--text-secondary);
        font-weight: 500;
      }
      .form-control {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-color);
        padding: 0.75rem 1rem;
        border-radius: 8px;
        color: var(--text-primary);
        font-family: inherit;
        font-size: 1rem;
        transition: all 0.2s;

        &:focus {
          outline: none;
          border-color: var(--color-primary);
          background: rgba(255, 255, 255, 0.08);
        }
      }
      select.form-control {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1em;
      }
      
      .foods-section {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      .section-header h4 {
        font-size: 1.1rem;
        color: var(--text-primary);
      }
      .food-items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .food-item-row {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
        background: rgba(0, 0, 0, 0.2);
        padding: 1.25rem;
        border-radius: 8px;
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.05);
      }
      .index {
        position: absolute;
        top: -10px;
        left: 10px;
        background: var(--bg-dark);
        color: var(--color-primary);
        font-size: 0.75rem;
        padding: 2px 8px;
        border-radius: 10px;
        font-weight: bold;
      }
      .select-group {
        flex: 2;
      }
      .input-group {
        flex: 1;
      }
      .btn-icon.delete {
        background: none;
        border: none;
        color: var(--accent-color);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        height: 42px; /* match input height */
        display: flex;
        align-items: center;
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.1);
        }
      }
      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* Buttons (using global styles if available, or redefining here) */
      .btn-primary, .btn-secondary {
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
      }
      .btn-primary {
        background: var(--gradient-primary);
        color: white;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
      }
      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .btn-secondary.small {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class DietFormComponent implements OnInit {
  @Input() availableFoods: Food[] = [];
  @Output() save = new EventEmitter<MealLogCreateRequest>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const today = new Date().toISOString().split('T')[0];
    this.form = this.fb.group({
      date: [today, Validators.required],
      mealType: ['BREAKFAST', Validators.required],
      items: this.fb.array([this.createFoodItem()])
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createFoodItem(): FormGroup {
    return this.fb.group({
      foodId: ['', Validators.required],
      servings: [1, [Validators.required, Validators.min(0.1)]]
    });
  }

  addFoodItem() {
    this.items.push(this.createFoodItem());
  }

  removeFoodItem(index: number) {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.form.value as MealLogCreateRequest);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}

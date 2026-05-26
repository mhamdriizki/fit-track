import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealLog } from '../../../../core/models/diet.model';

@Component({
  selector: 'app-diet-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="diet-list">
      <div *ngIf="mealLogs.length === 0" class="empty-state">
        <p>No meals logged yet. Log your first meal!</p>
      </div>

      <div *ngFor="let meal of mealLogs" class="diet-card glass">
        <div class="card-header">
          <div class="meal-info">
            <h3>{{ meal.mealType }}</h3>
            <span class="date">{{ meal.date | date: 'mediumDate' }}</span>
          </div>
          <div class="total-macros">
            <span class="macro cal">{{ meal.totalCalories | number:'1.0-0' }} kcal</span>
          </div>
        </div>

        <div class="macros-summary">
          <div class="macro-item">
            <span class="label">Protein</span>
            <span class="value">{{ meal.totalProtein | number:'1.0-1' }}g</span>
          </div>
          <div class="macro-item">
            <span class="label">Carbs</span>
            <span class="value">{{ meal.totalCarbs | number:'1.0-1' }}g</span>
          </div>
          <div class="macro-item">
            <span class="label">Fat</span>
            <span class="value">{{ meal.totalFat | number:'1.0-1' }}g</span>
          </div>
        </div>

        <div class="foods">
          <h4>Foods</h4>
          <ul>
            <li *ngFor="let item of meal.items">
              <div class="food-details">
                <span class="food-name">{{ item.food?.name || 'Unknown Food' }}</span>
                <span class="servings">{{ item.servings }} x {{ item.food?.servingSize || 'serving' }}</span>
              </div>
              <span class="food-cal">{{ item.calories | number:'1.0-0' }} kcal</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .diet-list {
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
      .diet-card {
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
        margin-bottom: 1.5rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 1rem;
      }
      .meal-info h3 {
        color: var(--color-primary);
        font-size: 1.25rem;
        text-transform: capitalize;
        margin-bottom: 0.25rem;
      }
      .date {
        color: var(--text-secondary);
        font-size: 0.875rem;
      }
      .total-macros .macro.cal {
        background: var(--bg-main);
        color: var(--color-primary);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 700;
        font-size: 1rem;
      }
      .macros-summary {
        display: flex;
        justify-content: space-around;
        background: var(--bg-main);
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
      }
      .macro-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
      }
      .macro-item .label {
        font-size: 0.75rem;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .macro-item .value {
        font-weight: 600;
        color: var(--text-primary);
      }
      .foods h4 {
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: var(--text-secondary);
        margin-bottom: 0.75rem;
      }
      .foods ul {
        list-style: none;
        padding: 0;
      }
      .foods li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 0;
        border-bottom: 1px dashed var(--border-color);

        &:last-child {
          border-bottom: none;
        }
      }
      .food-details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .food-name {
        font-weight: 500;
      }
      .servings {
        color: var(--text-secondary);
        font-size: 0.875rem;
      }
      .food-cal {
        font-weight: 600;
        color: var(--color-primary);
      }
    `,
  ],
})
export class DietListComponent {
  @Input() mealLogs: MealLog[] = [];
}

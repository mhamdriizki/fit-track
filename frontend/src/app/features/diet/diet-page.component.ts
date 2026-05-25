import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DietListComponent } from '../components/diet-list/diet-list.component';
import { DietFormComponent } from '../components/diet-form/diet-form.component';
import { DietService } from '../../../core/services/diet.service';
import { FoodService } from '../../../core/services/food.service';
import { AuthService } from '../../../core/services/auth.service';
import { Food, MealLog, MealLogCreateRequest } from '../../../core/models/diet.model';

@Component({
  selector: 'app-diet-page',
  standalone: true,
  imports: [CommonModule, DietListComponent, DietFormComponent],
  template: `
    <div class="diet-page">
      <header class="page-header">
        <div>
          <h2>Diet & Nutrition</h2>
          <p class="subtitle">Track your daily meals and macros</p>
        </div>
        <button class="btn-primary" (click)="showForm = true" *ngIf="!showForm">
          + Log Meal
        </button>
      </header>

      <app-diet-form 
        *ngIf="showForm" 
        [availableFoods]="foods"
        (save)="onSaveMeal($event)" 
        (cancel)="showForm = false">
      </app-diet-form>

      <div class="logs-section">
        <h3>Recent Meals</h3>
        <div *ngIf="loading" class="loading">Loading your meals...</div>
        <app-diet-list *ngIf="!loading" [mealLogs]="mealLogs"></app-diet-list>
      </div>
    </div>
  `,
  styles: [
    `
      .diet-page {
        max-width: 800px;
        margin: 0 auto;
      }
      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }
      .page-header h2 {
        font-size: 2rem;
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.25rem;
      }
      .subtitle {
        color: var(--text-secondary);
      }
      .logs-section h3 {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
      }
      .loading {
        text-align: center;
        padding: 2rem;
        color: var(--text-secondary);
      }
    `,
  ],
})
export class DietPageComponent implements OnInit {
  mealLogs: MealLog[] = [];
  foods: Food[] = [];
  showForm = false;
  loading = false;

  constructor(
    private dietService: DietService,
    private foodService: FoodService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    const userId = this.auth.getCurrentUserId();

    // Fetch foods
    this.foodService.getFoods().subscribe({
      next: (foods) => {
        this.foods = foods;
      },
      error: (err) => console.error('Failed to load foods', err)
    });

    // Fetch diets
    this.dietService.getMealLogs(userId).subscribe({
      next: (logs) => {
        // Sort descending by date & created at
        this.mealLogs = logs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load meal logs', err);
        this.loading = false;
      }
    });
  }

  onSaveMeal(request: MealLogCreateRequest) {
    request.userId = this.auth.getCurrentUserId();
    this.dietService.createMealLog(request).subscribe({
      next: (newLog) => {
        this.mealLogs.unshift(newLog); // Add to top
        this.showForm = false;
      },
      error: (err) => console.error('Failed to save meal', err)
    });
  }
}

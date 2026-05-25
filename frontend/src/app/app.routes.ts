import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'workout', loadComponent: () => import('./features/workout/workout-page.component').then(m => m.WorkoutPageComponent) },
  {
    path: 'diet',
    loadComponent: () => import('./features/diet/diet-page.component').then(m => m.DietPageComponent)
  },
  // Future routes will go here
  { path: '**', redirectTo: '' }
];

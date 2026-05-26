import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/auth/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: '', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'workout', 
    loadComponent: () => import('./features/workout/workout-page.component').then(m => m.WorkoutPageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'diet',
    loadComponent: () => import('./features/diet/diet-page.component').then(m => m.DietPageComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];

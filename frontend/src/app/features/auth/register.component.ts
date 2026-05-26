import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="glass auth-card">
        <h1>Create Account</h1>
        <p class="subtitle">Join FitTrack to start your journey</p>
        
        <div *ngIf="error" class="error-msg">{{ error }}</div>
        
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              class="form-control"
              [(ngModel)]="userData.username" 
              required
              minlength="3"
            >
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              class="form-control"
              [(ngModel)]="userData.email" 
              required
              email
            >
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              class="form-control"
              [(ngModel)]="userData.password" 
              required
              minlength="6"
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="currentWeight">Current Weight (kg)</label>
              <input 
                type="number" 
                id="currentWeight" 
                name="currentWeight" 
                class="form-control"
                [(ngModel)]="userData.currentWeight" 
                required
                min="30"
              >
            </div>
            <div class="form-group">
              <label for="targetWeight">Target Weight (kg)</label>
              <input 
                type="number" 
                id="targetWeight" 
                name="targetWeight" 
                class="form-control"
                [(ngModel)]="userData.targetWeight" 
                required
                min="30"
              >
            </div>
          </div>
          
          <button type="submit" class="btn-primary" [disabled]="!registerForm.form.valid || loading">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </form>
        
        <div class="auth-links">
          <p>Already have an account? <a routerLink="/login">Log in here</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      animation: fadeIn 0.5s ease-out;
    }
    .auth-card {
      width: 100%;
      max-width: 450px;
      padding: 2.5rem;
      border-radius: var(--border-radius);
    }
    h1 {
      color: var(--color-primary);
      text-align: center;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: var(--text-secondary);
      text-align: center;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    .form-row {
      display: flex;
      gap: 1rem;
    }
    .form-row .form-group {
      flex: 1;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-secondary);
      font-size: 0.875rem;
    }
    .btn-primary {
      width: 100%;
      padding: 1rem;
      margin-top: 1rem;
      font-size: 1rem;
    }
    .btn-primary:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .error-msg {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      text-align: center;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    .auth-links {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .auth-links a {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    .auth-links a:hover {
      color: var(--color-secondary);
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class RegisterComponent {
  userData = { 
    username: '', 
    email: '', 
    password: '',
    currentWeight: null,
    targetWeight: null
  };
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    
    this.authService.register(this.userData).subscribe({
      next: () => {
        // Automatically login after successful registration
        this.authService.login({
          username: this.userData.username,
          password: this.userData.password
        }).subscribe({
          next: () => this.router.navigate(['/']),
          error: () => this.router.navigate(['/login'])
        });
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Registration failed. Please try again.';
        console.error('Registration error', err);
      }
    });
  }
}

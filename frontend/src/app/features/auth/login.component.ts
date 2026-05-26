import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="glass auth-card">
        <h1>Welcome Back</h1>
        <p class="subtitle">Log in to track your fitness journey</p>
        
        <div *ngIf="error" class="error-msg">{{ error }}</div>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              class="form-control"
              [(ngModel)]="credentials.username" 
              required
              autofocus
            >
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              class="form-control"
              [(ngModel)]="credentials.password" 
              required
            >
          </div>
          
          <button type="submit" class="btn-primary" [disabled]="!loginForm.form.valid || loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        
        <div class="auth-links">
          <p>Don't have an account? <a routerLink="/register">Register here</a></p>
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
      max-width: 400px;
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
      margin-bottom: 1.5rem;
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
export class LoginComponent {
  credentials = { username: '', password: '' };
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = '';
    
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Invalid username or password';
        console.error('Login error', err);
      }
    });
  }
}

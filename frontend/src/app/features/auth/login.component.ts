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
        <div class="card-header">
          <h1>Welcome Back</h1>
          <p class="subtitle">Log in to track your fitness journey</p>
        </div>
        
        <div *ngIf="error" class="error-msg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {{ error }}
        </div>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="auth-form">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <input 
                type="text" 
                id="username" 
                name="username" 
                class="form-control"
                placeholder="Enter your username"
                [(ngModel)]="credentials.username" 
                required
                autofocus
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="form-control"
                placeholder="Enter your password"
                [(ngModel)]="credentials.password" 
                required
              >
            </div>
          </div>
          
          <button type="submit" class="btn-primary auth-submit" [disabled]="!loginForm.form.valid || loading">
            <span *ngIf="loading" class="spinner"></span>
            {{ loading ? 'Logging in...' : 'Sign In' }}
          </button>
        </form>
        
        <div class="auth-links">
          <p>Don't have an account? <a routerLink="/register" class="highlight-link">Create one now</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 100px);
      padding: 2rem;
      animation: fadeIn 0.4s ease-out;
    }
    
    .auth-card {
      width: 100%;
      max-width: 420px;
      padding: 3rem 2.5rem;
      border-radius: 20px;
    }
    
    .card-header {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    
    h1 {
      color: var(--color-primary);
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
    }
    
    .auth-form {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      font-weight: 500;
      font-size: 0.875rem;
    }
    
    .form-control {
      width: 100%;
      padding: 0.875rem 1rem;
      background: var(--bg-surface);
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 10px;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.2s ease;
      box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
    }
    
    .form-control::placeholder {
      color: var(--text-secondary);
      opacity: 0.6;
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--color-primary);
      background: var(--bg-surface);
      box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.15);
    }
    
    .auth-submit {
      margin-top: 1rem;
      padding: 1rem;
      font-size: 1.05rem;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      letter-spacing: 0.5px;
    }
    
    .spinner {
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
    }
    
    .error-msg {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      padding: 0.875rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    
    .auth-links {
      text-align: center;
      margin-top: 2rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    
    .highlight-link {
      color: var(--color-primary);
      text-decoration: none;
      font-weight: 600;
      position: relative;
      transition: color 0.3s ease;
    }
    
    .highlight-link::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: var(--color-primary);
      transform-origin: bottom right;
      transition: transform 0.3s ease-out;
    }
    
    .highlight-link:hover {
      color: var(--color-primary-hover);
    }
    
    .highlight-link:hover::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
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

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
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      
      <div class="glass auth-card">
        <div class="card-header">
          <h1>Create Account</h1>
          <p class="subtitle">Join FitTrack to start your journey</p>
        </div>
        
        <div *ngIf="error" class="error-msg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {{ error }}
        </div>
        
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="auth-form">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <input 
                type="text" 
                id="username" 
                name="username" 
                class="form-control"
                placeholder="Choose a username"
                [(ngModel)]="userData.username" 
                required
                minlength="3"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <input 
                type="email" 
                id="email" 
                name="email" 
                class="form-control"
                placeholder="Enter your email"
                [(ngModel)]="userData.email" 
                required
                email
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
                placeholder="Create a password"
                [(ngModel)]="userData.password" 
                required
                minlength="6"
              >
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="currentWeight">Current Weight (kg)</label>
              <div class="input-wrapper">
                <input 
                  type="number" 
                  id="currentWeight" 
                  name="currentWeight" 
                  class="form-control"
                  placeholder="e.g. 70"
                  [(ngModel)]="userData.currentWeight" 
                  required
                  min="30"
                >
              </div>
            </div>
            <div class="form-group">
              <label for="targetWeight">Target Weight (kg)</label>
              <div class="input-wrapper">
                <input 
                  type="number" 
                  id="targetWeight" 
                  name="targetWeight" 
                  class="form-control"
                  placeholder="e.g. 65"
                  [(ngModel)]="userData.targetWeight" 
                  required
                  min="30"
                >
              </div>
            </div>
          </div>
          
          <button type="submit" class="btn-primary auth-submit" [disabled]="!registerForm.form.valid || loading">
            <span *ngIf="loading" class="spinner"></span>
            {{ loading ? 'Registering...' : 'Create Account' }}
          </button>
        </form>
        
        <div class="auth-links">
          <p>Already have an account? <a routerLink="/login" class="highlight-link">Log in here</a></p>
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
      overflow: hidden;
      animation: fadeIn 0.8s ease-out;
    }
    
    .bg-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      z-index: -1;
      opacity: 0.6;
      animation: float 10s infinite ease-in-out alternate;
    }
    
    .shape-1 {
      width: 40vw;
      height: 40vw;
      background: rgba(99, 102, 241, 0.4);
      top: -10%;
      left: -10%;
    }
    
    .shape-2 {
      width: 35vw;
      height: 35vw;
      background: rgba(236, 72, 153, 0.4);
      bottom: -10%;
      right: -10%;
      animation-delay: -5s;
    }
    
    .auth-card {
      width: 100%;
      max-width: 450px;
      padding: 3rem 2.5rem;
      border-radius: 20px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
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
      color: var(--text-primary);
      font-weight: 500;
      font-size: 0.875rem;
    }
    
    .form-control {
      width: 100%;
      padding: 0.875rem 1rem;
      background: rgba(120, 120, 120, 0.05);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      color: var(--text-primary);
      font-family: inherit;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    .form-control::placeholder {
      color: var(--text-secondary);
      opacity: 0.6;
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--color-primary);
      background: rgba(120, 120, 120, 0.08);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
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
      from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
      to { opacity: 1; transform: translateY(0); filter: blur(0); }
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(50px, 30px) scale(1.1); }
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

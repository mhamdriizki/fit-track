import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h1>Welcome to FitTrack</h1>
      <p class="subtitle">Your personal fitness and nutrition companion.</p>
      
      <div class="glass card">
        <h2>Dashboard Overview</h2>
        <p>This is a placeholder for the Dashboard feature.</p>
        <button class="btn-primary mt-2">Get Started</button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      animation: fadeIn 0.5s ease-out;
    }
    .subtitle {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
    .card {
      padding: 2rem;
      border-radius: var(--border-radius);
    }
    .mt-2 {
      margin-top: 1rem;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DashboardComponent {}

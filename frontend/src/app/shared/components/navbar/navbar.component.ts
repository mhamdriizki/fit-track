import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar glass">
      <div class="brand">
        <span class="logo">FitTrack</span>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a></li>
        <li><a routerLink="/workout" routerLinkActive="active">Workout</a></li>
        <li><a routerLink="/diet" routerLinkActive="active">Diet Log</a></li>
      </ul>
      <div class="actions">
        <button class="btn-primary">Sign In</button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      position: sticky;
      top: 0;
      z-index: 100;
      border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
    .brand .logo {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nav-links {
      display: flex;
      list-style: none;
      gap: 2rem;
    }
    .nav-links a {
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 500;
      transition: var(--transition);
      
      &:hover, &.active {
        color: var(--color-primary);
      }
    }
  `]
})
export class NavbarComponent {}

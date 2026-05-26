import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar glass">
      <div class="brand">
        <span class="logo">FitTrack</span>
      </div>
      <ul class="nav-links" *ngIf="currentUser$ | async">
        <li>
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span class="nav-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a routerLink="/workout" routerLinkActive="active">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            <span class="nav-text">Workout</span>
          </a>
        </li>
        <li>
          <a routerLink="/diet" routerLinkActive="active">
            <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
            <span class="nav-text">Diet Log</span>
          </a>
        </li>
      </ul>
      <div class="actions">
        <ng-container *ngIf="currentUser$ | async as user; else guestLinks">
          <span class="user-greeting">Hi, {{ user.username }}!</span>
          <button class="btn-primary logout-btn" (click)="logout()">
            Log Out
          </button>
        </ng-container>
        <ng-template #guestLinks>
          <a routerLink="/login" class="btn-primary login-btn">Sign In</a>
        </ng-template>
      </div>
    </nav>
  `,
  styles: [
    `
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
        color: var(--color-primary);
      }
      .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
      }
      .nav-links a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: var(--text-secondary);
        font-weight: 500;
        transition: var(--transition);

        &:hover,
        &.active {
          color: var(--color-primary);
        }
      }
      .nav-icon {
        display: none; /* Hidden on desktop */
      }
      .user-greeting {
        margin-right: 15px;
        font-weight: 500;
        color: var(--text-primary);
      }
      .login-btn {
        text-decoration: none;
        display: inline-block;
      }
      .logout-btn {
        background: var(--bg-main);
        color: var(--text-secondary);
        border: 1px solid var(--border-color);
        box-shadow: none;
      }
      .logout-btn:hover {
        background: var(--border-color);
        color: var(--text-primary);
        box-shadow: none;
      }

      /* Mobile Responsive Styles */
      @media (max-width: 768px) {
        .navbar {
          padding: 1rem;
        }
        .user-greeting {
          display: none; /* Hide greeting on smaller screens to save space */
        }
        .nav-links {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: var(--bg-surface);
          margin: 0;
          padding: 0.75rem 0;
          justify-content: space-around;
          border-top: 1px solid var(--border-color);
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
          z-index: 999;
        }
        .nav-links li {
          flex: 1;
          text-align: center;
        }
        .nav-links a {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.5rem;
          font-size: 0.875rem;
        }
        .nav-text {
          display: none; /* Hide text on mobile */
        }
        .nav-icon {
          display: block; /* Show icon on mobile */
          width: 24px;
          height: 24px;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  currentUser$: Observable<any>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
  }
}

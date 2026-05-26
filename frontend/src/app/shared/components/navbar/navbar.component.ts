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
      <ul class="nav-links" *ngIf="(currentUser$ | async)">
        <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a></li>
        <li><a routerLink="/workout" routerLinkActive="active">Workout</a></li>
        <li><a routerLink="/diet" routerLinkActive="active">Diet Log</a></li>
      </ul>
      <div class="actions">
        <ng-container *ngIf="(currentUser$ | async) as user; else guestLinks">
          <span class="user-greeting">Hi, {{ user.username }}!</span>
          <button class="btn-primary logout-btn" (click)="logout()">Log Out</button>
        </ng-container>
        <ng-template #guestLinks>
          <a routerLink="/login" class="btn-primary login-btn">Sign In</a>
        </ng-template>
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
      color: var(--color-primary);
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
  `]
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

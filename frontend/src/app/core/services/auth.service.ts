import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Hardcoded UUID for development. 
  // In a real application, this would come from a JWT or session after login.
  private currentUserId = 'd290f1ee-6c54-4b01-90e6-d701748f0851'; // Example UUID

  getCurrentUserId(): string {
    return this.currentUserId;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WorkoutSession, WorkoutSessionCreateRequest } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = `${environment.apiUrl}/workouts`;

  constructor(private http: HttpClient) {}

  getWorkoutsByUser(userId: string): Observable<WorkoutSession[]> {
    return this.http.get<WorkoutSession[]>(`${this.apiUrl}/user/${userId}`);
  }

  createWorkout(request: WorkoutSessionCreateRequest): Observable<WorkoutSession> {
    return this.http.post<WorkoutSession>(this.apiUrl, request);
  }

  deleteWorkout(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

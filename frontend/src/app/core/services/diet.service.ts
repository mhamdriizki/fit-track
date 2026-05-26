import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MealLog, MealLogCreateRequest } from '../models/diet.model';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  private apiUrl = `${environment.apiUrl}/diets`;

  constructor(private http: HttpClient) {}

  getMealLogs(userId: string, date?: string): Observable<MealLog[]> {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return this.http.get<MealLog[]>(`${this.apiUrl}/user/${userId}?date=${targetDate}`);
  }

  createMealLog(request: MealLogCreateRequest): Observable<MealLog> {
    return this.http.post<MealLog>(this.apiUrl, request);
  }
}

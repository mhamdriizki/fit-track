import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DailySummary } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) {}

  getDailySummary(userId: string, date: string): Observable<DailySummary> {
    let params = new HttpParams()
      .set('userId', userId)
      .set('date', date);

    return this.http.get<DailySummary>(`${this.apiUrl}/summary`, { params });
  }
}

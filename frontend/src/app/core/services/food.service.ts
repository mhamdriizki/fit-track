import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Food } from '../models/diet.model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = `${environment.apiUrl}/foods`;

  constructor(private http: HttpClient) {}

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.apiUrl);
  }
}

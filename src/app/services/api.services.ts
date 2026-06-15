import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel, UserData } from '../models/register.model';

@Injectable({
  providedIn: 'root', // Makes the service globally available
})
export class ApiService {
  private http = inject(HttpClient);
  //private apiUrl = 'https://localhost:7222/api/users';

  // GET: Fetch data
  getUser(): Observable<UserData[]> {
    var response = this.http.get<UserData[]>('/api/users/getUser');
    return response;
  }

  // POST: Add user
  addUser(userData: UserModel): Observable<UserData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    var response = this.http.post<UserData>('/api/users/addUser', userData, { headers });
    return response;
  }
}

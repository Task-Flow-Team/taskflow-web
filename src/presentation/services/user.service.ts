import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserProfile {
  username: string;
  email: string;
  name: string | null;
  created_at: string;
  profile_picture_url: string | null;
  banner_picture_url: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://taskflow-api-lyjt.onrender.com//v1/users/profile/me';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UserProfile>(this.apiUrl, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/src/enviroments/enviroment';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  language_preference?: string;
  timezone?: string;
}

export interface AccessToken {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}
  register(data: RegisterRequest): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.apiUrl}/v1/auth/register`, data);
  }
}

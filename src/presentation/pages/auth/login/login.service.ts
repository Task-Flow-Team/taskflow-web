import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface AccessToken {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<AccessToken> {
    return this.http.post<AccessToken>(`${this.apiUrl}/v1/auth/login`, {
      email,
      password,
    });
  }
}

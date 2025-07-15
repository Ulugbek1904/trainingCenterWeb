import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto, AuthResponse } from '../models/auth.model';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private appConfig = inject(AppConfigService);
  private readonly apiUrl = `${this.appConfig.authApiUrl}`;
  private http = inject(HttpClient);

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto);
  }

  refresh(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, { refreshToken: token });
  }

  logout(refreshToken: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, refreshToken);
  }
}

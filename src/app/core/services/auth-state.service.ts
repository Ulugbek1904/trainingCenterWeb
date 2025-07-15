import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export interface JwtClaims {
  sub: string;
  username: string;
  role: string;
  fullName: string;
  tenantId: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private userSubject = new BehaviorSubject<JwtClaims | null>(this.getUserFromToken());
  user$ = this.userSubject.asObservable();

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    this.userSubject.next(this.getUserFromToken());
  }

  getUserFromToken(): JwtClaims | null {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
      return jwtDecode<JwtClaims>(token);
    } catch (err) {
      console.warn('Invalid JWT token', err);
      return null;
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.userSubject.next(null);
  }
}

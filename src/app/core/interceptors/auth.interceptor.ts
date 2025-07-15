import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpClient,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { AuthStateService } from '../services/auth-state.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const authApi = inject(AuthApiService);
  const authState = inject(AuthStateService);

  const accessToken = authState.getAccessToken();
  const refreshToken = authState.getRefreshToken();

  if (
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/refresh') ||
    req.url.includes('/password')
  ) {
    return next(req);
  }

  if (accessToken) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(cloned).pipe(
      catchError((err) => {
        if (err.status === 401 && refreshToken) {
          return handleRefreshToken(authApi, authState, router, req, next);
        }

        return throwError(() => err);
      })
    );
  }

  return next(req);
};

function handleRefreshToken(
  authApi: AuthApiService,
  authState: AuthStateService,
  router: Router,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const refreshToken = authState.getRefreshToken();

  if (!refreshToken) {
    authState.clear();
    router.navigateByUrl('/login');
    return throwError(() => new Error('Refresh token topilmadi'));
  }

  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authApi.refresh(refreshToken).pipe(
      switchMap((res) => {
        authState.setTokens(res.accessToken, res.refreshToken);
        refreshTokenSubject.next(res.accessToken);
        isRefreshing = false;

        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${res.accessToken}`,
          },
        });

        return next(cloned);
      }),
      catchError((err) => {
        isRefreshing = false;
        authState.clear();
        router.navigateByUrl('/login');
        return throwError(() => new Error('Sessiya tugadi. Qayta kiring.'));
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(cloned);
      })
    );
  }
}

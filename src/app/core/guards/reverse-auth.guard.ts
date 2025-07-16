import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const reverseAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');

  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;

    if (exp && Date.now() < exp * 1000) {
      router.navigateByUrl('/dashboard');
      return false;
    }
  } catch (e) {
    console.warn("Tokenni decode qilishda xatolik:", e);
  }

  return true;
};

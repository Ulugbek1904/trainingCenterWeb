import { Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from './layout/superadmin/super-admin-layout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/super-admin/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'tenants',
        loadComponent: () =>
          import('./pages/super-admin/tenants/tenants/tenants.component').then((m) => m.TenantsComponent),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./pages/super-admin/students/students.component').then(m => m.StudentsComponent),
      }

    ],
  },


  {
    path: '**',
    redirectTo: '',
  }
];

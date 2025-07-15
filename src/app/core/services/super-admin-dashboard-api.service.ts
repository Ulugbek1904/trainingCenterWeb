import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuperAdminDashboardDto } from '../models/dashboard.model';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class SuperAdminDashboardApiService {
  private http = inject(HttpClient);
  private config = inject(AppConfigService);
  private readonly url = `${this.config.apiBaseUrl}/superAdminDashboard`;

  getStatistics(): Observable<SuperAdminDashboardDto> {
    return this.http.get<SuperAdminDashboardDto>(`${this.url}/statistics`);
  }
}

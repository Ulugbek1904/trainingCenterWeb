import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';
import { SuperAdminDashboardDto } from '../../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private http = inject(HttpClient);
  private config = inject(AppConfigService);
  private readonly url = `${this.config.apiBaseUrl}/superadmindashboard`;

  getStatistics(): Observable<SuperAdminDashboardDto> {
    return this.http.get<SuperAdminDashboardDto>(`${this.url}/statistics`);
  }
}

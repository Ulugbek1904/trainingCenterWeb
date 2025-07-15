import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { Observable } from 'rxjs';
import { TenantCreateDto, TenantDto, TenantUpdateDto } from '../../models/tenant/tenant.model';

@Injectable({ providedIn: 'root' })
export class TenantApiService {
  private http = inject(HttpClient);
  private apiUrl = inject(AppConfigService).tenantApiUrl;

  getAll(): Observable<TenantDto[]> {
    return this.http.get<TenantDto[]>(this.apiUrl);
  }

  getById(id: string): Observable<TenantDto> {
    return this.http.get<TenantDto>(`${this.apiUrl}/${id}`);
  }

  create(dto: TenantCreateDto): Observable<TenantDto> {
    return this.http.post<TenantDto>(this.apiUrl, dto);
  }

  update(id: string, dto: TenantUpdateDto): Observable<TenantDto> {
    return this.http.put<TenantDto>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleStatus(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/${id}/toggle-status`, {});
  }
}

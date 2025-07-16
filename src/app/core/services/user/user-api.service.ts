import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDto, UserCreateDto, UserUpdateDto } from '../../models/user/user.model';
import { Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';
import { PagedResult } from '../../models/user/paged-result.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly baseUrl = inject(AppConfigService).userApiUrl

  constructor(private http: HttpClient) {}

  getAll(): Observable<PagedResult<UserDto>> {
    return this.http.get<PagedResult<UserDto>>(this.baseUrl);
  }

  create(dto: UserCreateDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.baseUrl, dto);
  }

  update(id: string, dto: UserUpdateDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  toggleStatus(id: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.baseUrl}/${id}/toggle-status`, {});
  }
}

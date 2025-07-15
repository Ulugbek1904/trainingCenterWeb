import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  readonly projectName = 'EduTrek';

  // API config
  readonly apiBaseUrl = 'http://localhost:5000/api';
  readonly authApiUrl = `${this.apiBaseUrl}/auth`;
  readonly tenantApiUrl = `${this.apiBaseUrl}/tenant`;
  readonly studentApiUrl = `${this.apiBaseUrl}/student`;
  
}

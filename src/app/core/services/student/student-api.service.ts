// core/services/student/student-api.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentDto } from '../../models/student/student.model';
import { StudentQueryDto } from '../../models/student/student-query.model';
import { AppConfigService } from '../app-config.service';

@Injectable({ providedIn: 'root' })
export class StudentApiService {
  private appConfig = inject(AppConfigService);
  private readonly apiUrl = `${this.appConfig.apiBaseUrl}/superadmindashboard`;

  constructor(private http: HttpClient) {}

  getStudents(query: StudentQueryDto): Observable<StudentDto[]> {
    const cleanQuery: { [key: string]: any } = {};
    if (query.fullName) cleanQuery['fullName'] = query.fullName;
    if (query.address) cleanQuery['address'] = query.address;
    if (query.gender != null) cleanQuery['gender'] = query.gender;
    if (query.startYear instanceof Date) cleanQuery['startYear'] = query.startYear.toISOString();
    if (query.endYear instanceof Date) cleanQuery['endYear'] = query.endYear.toISOString();

    return this.http.get<StudentDto[]>(`${this.apiUrl}/students`, {
      params: cleanQuery,
    });
  }
}
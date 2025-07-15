// students.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { StudentApiService } from '../../../core/services/student/student-api.service';
import { StudentDto } from '../../../core/models/student/student.model';
import { StudentQueryDto } from '../../../core/models/student/student-query.model';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
  ],
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  private studentApi = inject(StudentApiService);

  students: StudentDto[] = [];
  isLoading = false;

  search: StudentQueryDto = {
    fullName: '',
    address: '',
    gender: null,
    startYear: null,
    endYear: null,
  };

  genders = [
    { label: 'Barchasi', value: null },
    { label: 'Erkak', value: 'Male' },
    { label: 'Ayol', value: 'Female' },
  ];

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.isLoading = true;
    this.studentApi.getStudents(this.search).subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Xatolik studentlarni olishda:', err);
        this.isLoading = false;
      },
    });
  }

  clearFilters() {
    this.search = {
      fullName: '',
      address: '',
      gender: null,
      startYear: null,
      endYear: null,
    };
    this.loadStudents();
  }

  onSearchChange() {
    this.loadStudents();
  }
}
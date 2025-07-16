import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserFormComponent } from './user-form/user-form.component';
import { UserApiService } from '../../../core/services/user/user-api.service';
import { UserDto } from '../../../core/models/user/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, UserFormComponent],
  templateUrl: './users.component.html',
  providers: [ConfirmationService, MessageService]
})
export class UsersComponent implements OnInit {
  private userApi = inject(UserApiService);
  users: UserDto[] = [];
  isLoading = false;

  selectedUser: UserDto | null = null;
  isFormOpen = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
  this.isLoading = true;
  this.userApi.getAll().subscribe({
    next: (response) => {
      this.users = response.items.filter(u => u.role === 0 || u.role === 1);
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Adminlarni olishda xatolik:', err);
      this.isLoading = false;
    },
  });
}


onToggleStatus(user: UserDto) {
    this.userApi.toggleStatus(user.id).subscribe({
      next: (newStatus) => {
        user.isActive = newStatus;
      },
      error: (err) => {
        console.error('Statusni o‘zgartirishda xatolik:', err);
      },
    });
  }

  onCreate() {
    this.selectedUser = null;
    this.isFormOpen = true;
  }

  onEdit(user: UserDto) {
    this.selectedUser = user;
    this.isFormOpen = true;
  }

  onDelete(id: string) {
    if (confirm('O‘chirishni istaysizmi?')) {
      this.userApi.delete(id).subscribe(() => {
        this.users = this.users.filter(u => u.id !== id);
      });
    }
  }

  onFormSaved() {
    this.loadUsers();
    this.isFormOpen = false;
  }

  onFormClosed() {
    this.isFormOpen = false;
  }
}

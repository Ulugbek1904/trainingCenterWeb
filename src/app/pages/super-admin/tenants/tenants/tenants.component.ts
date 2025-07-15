import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TenantDto } from '../../../../core/models/tenant/tenant.model';
import { TenantApiService } from '../../../../core/services/tenant/tenant-api.service';
import { TenantFormComponent } from '../tenant-form/tenant-form.component';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    TenantFormComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './tenants.component.html',
})
export class TenantsComponent implements OnInit {
  private tenantApi = inject(TenantApiService);
  private confirmationService = inject(ConfirmationService);

  tenants: TenantDto[] = [];
  isLoading = false;

  selectedTenant: TenantDto | null = null;
  isFormOpen = false;

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants() {
    this.isLoading = true;
    this.tenantApi.getAll().subscribe({
      next: (data) => {
        this.tenants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Tenantlarni olishda xatolik:', err);
        this.isLoading = false;
      },
    });
  }

  onEdit(tenant: TenantDto | null = null) {
    this.selectedTenant = tenant;
    this.isFormOpen = true;
  }

  onFormSaved() {
    this.isFormOpen = false;
    this.loadTenants();
  }

  onFormClosed() {
    this.isFormOpen = false;
  }

  onToggleStatus(tenant: TenantDto) {
    this.tenantApi.toggleStatus(tenant.id).subscribe({
      next: (newStatus) => {
        tenant.isActive = newStatus;
      },
      error: (err) => {
        console.error('Statusni o‘zgartirishda xatolik:', err);
      },
    });
  }

  onDelete(id: string) {
    this.confirmationService.confirm({
      message: 'Tenantni o‘chirishni istaysizmi?',
      header: 'O‘chirishni tasdiqlang',
      accept: () => {
        this.tenantApi.delete(id).subscribe({
          next: () => {
            this.tenants = this.tenants.filter((t) => t.id !== id);
          },
          error: (err) => {
            console.error('O‘chirishda xatolik:', err);
          },
        });
      },
    });
  }
}

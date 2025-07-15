import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardApiService } from '../../core/services/dashboard/dashboard-api.service';
import { SuperAdminDashboardDto } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private dashboardApi = inject(DashboardApiService);
  stats: SuperAdminDashboardDto | null = null;
  isLoading = true;

  ngOnInit(): void {
    this.dashboardApi.getStatistics().subscribe({
      next: (data) => {
        this.stats = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Xatolik statistikani olishda:', err);
        this.isLoading = false;
      },
    });
  }
}

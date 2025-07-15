export interface TenantActivityDto {
  tenantId: string;
  tenantName: string;
  studentCount: number;
  totalPayments: number;
}

export interface SuperAdminDashboardDto {
  totalTenants: number;
  totalStudents: number;
  totalTeachers: number;
  totalActiveCourses: number;
  totalPayments: number;
  last7DaysPayments: number;
  last7DaysNewStudents: number;
  topTenants: TenantActivityDto[];
}

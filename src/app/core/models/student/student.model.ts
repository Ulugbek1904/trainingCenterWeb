export interface StudentDto {
  id: string;
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
  enrollmentDate: string;
  gender: 'Male' | 'Female';
  isActive: boolean;
}

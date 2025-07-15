export interface StudentQueryDto {
  fullName?: string;
  address?: string;
  gender?: string | null;
  startYear?: Date | null; 
  endYear?: Date | null;   
}
export interface UserDto {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  tenantId: string;
  address: string;
  languagePreference: string;
  role: number;
  isActive: boolean;
}

export interface UserCreateDto {
  fullName: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  tenantId: string;
  address?: string;
  languagePreference?: string;
  password: string;
  role: string; 
}

export interface UserUpdateDto extends UserCreateDto {
  id: string;
  isActive: boolean;
}

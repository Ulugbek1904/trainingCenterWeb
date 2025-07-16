export interface LoginDto {
  identifier: string;
  password: string;
}

export interface ResponseUserDto {
  id: string;
  username: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  role: string;
  profilePictureUrl?: string;
  isActive: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: ResponseUserDto;
}

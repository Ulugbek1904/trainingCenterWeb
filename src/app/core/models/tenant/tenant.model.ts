export interface TenantDto {
  id: string;
  name: string;
  logoUrl: string;
  telegramBotToken: string;
  contactPhoneNumber: string;
  address: string;
  language: string;
  isActive: boolean;
}

export interface TenantCreateDto {
  name: string;
  logoUrl: string;
  telegramBotToken: string;
  contactPhoneNumber: string;
  address: string;
  language: string;
}

export interface TenantUpdateDto extends TenantCreateDto {
  isActive: boolean;
}

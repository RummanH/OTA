import { RefreshTokenDto } from '../dtos/refresh.dto';

export enum UserType {
  USER_TYPE_B2B = 0,
  USER_TYPE_B2C = 1,
  USER_TYPE_SUB_AGENT = 2,
  USER_TYPE_SUB_USER = 3,
}

export enum UserRole {
  ROLE_USER = 0,
  ROLE_ADMIN = 1,
}

export interface SignupRequest {
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  firstName?: string;
  lastName?: string;
  userType?: UserType;
  companyName?: string;
  companyAddress?: string;
  district?: string;
  city?: string;
  establishedAt?: string;
  tradeLicenseNumber?: string;
  tradeLicenseFileUrl?: string;
  tinNumber?: string;
  tinCertificateUrl?: string;
  nidNumber?: string;
  nidFrontUrl?: string;
  nidBackUrl?: string;
  civilAviationCertUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IUserService {
  Signup(request: SignupRequest): Promise<AuthResponse>;
  Login(request: LoginRequest): Promise<AuthResponse>;
  Refresh(request: RefreshTokenDto): Promise<AuthResponse>;
}

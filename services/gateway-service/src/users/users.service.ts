import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from 'src/common/constants';
// import { IUserService } from '../../../../interfaces/users.proto';

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

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessExpiresIn: number;
  refreshExpiresIn: number;
}

export interface AuthResponse {
  tokens: Tokens;
}

export interface IUserService {
  Signup(request: SignupRequest): Promise<AuthResponse>;
  Login(request: LoginRequest): Promise<AuthResponse>;
}

@Injectable()
export class UsersService {
  private userService: IUserService;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>(USER_SERVICE_NAME);
  }

  signup(data: any) {
    console.log(data)
    return this.userService.Signup(data)
  }

  login(data: any) {
    return this.userService.Login(data);
  }
}

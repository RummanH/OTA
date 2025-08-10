// dto/signup.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { UserType } from '../users.entity';

export class SignupDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  passwordConfirm: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  civilAviationCertUrl: string;

  @IsOptional()
  nidFrontUrl: string;

  @IsOptional()
  nidBackUrl: string;

  @IsOptional()
  nidNumber: string;

  @IsOptional()
  tinCertificateUrl: string;

  @IsOptional()
  tinNumber: string;

  @IsOptional()
  tradeLicenseFileUrl: string;

  @IsOptional()
  tradeLicenseNumber: string;

  @IsOptional()
  companyLogoUrl: string;

  @IsOptional()
  establishedAt: Date;

  @IsOptional()
  city: string;

  @IsOptional()
  district: string;

  @IsOptional()
  companyAddress: string;

  @IsOptional()
  companyName: string;

  @IsOptional()
  @IsEnum(UserType)
  userType?: UserType;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { hashValue } from '../common/utils';

export enum UserType {
  B2B = 'B2B',
  B2C = 'B2C',
  SubAgent = 'SubAgent',
  SubUser = 'SubUser',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true, select: false })
  currentHashedRefreshToken?: string | null;

  @Column({ nullable: true })
  passwordConfirm: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordChangedAt: Date;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry: Date;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  profileImageUrl: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.B2C })
  userType: UserType;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  otpCode: string;

  @Column({ type: 'timestamp', nullable: true })
  otpCodeExpires: Date;

  @Column({ default: '' })
  companyName: string;

  @Column({ default: '' })
  companyAddress: string;

  @Column({ default: '' })
  district: string;

  @Column({ default: '' })
  city: string;

  @Column({ type: 'timestamp', nullable: true })
  establishedAt: Date;

  @Column({ default: '' })
  companyLogoUrl: string;

  @Column({ default: '' })
  tradeLicenseNumber: string;

  @Column({ default: '' })
  tradeLicenseFileUrl: string;

  @Column({ default: '' })
  tinNumber: string;

  @Column({ default: '' })
  tinCertificateUrl: string;

  @Column({ default: '' })
  nidNumber: string;

  @Column({ default: '' })
  nidFrontUrl: string;

  @Column({ default: '' })
  nidBackUrl: string;

  @Column({ default: '' })
  civilAviationCertUrl: string;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ default: 'sms' })
  twoFactorMethod: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const hashedPassword = await hashValue(this.password);
    console.log(hashedPassword);
    this.password = hashedPassword;
  }
}

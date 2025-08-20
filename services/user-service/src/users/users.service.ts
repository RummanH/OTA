import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { SignupDto } from '../common/dtos/signup.dto';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { JwtService } from '@nestjs/jwt';
import { valueCompare, hashValue } from 'src/common/utils';
import { SigninDto } from '../common/dtos/signin.dto';
import { JWT_ACCESS_SECRET, JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_SECRET, JWT_REFRESH_TOKEN_EXP, USER_REPOSITORY } from 'src/common/constants';
import { ForgotDto } from 'src/common/dtos/forgot.dto';
import { randomBytes } from 'node:crypto';
import { ResetPasswordDto } from 'src/common/dtos/reset-password.dto';
import { ResponseBuilder } from 'src/common/utils/base.response';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupData: SignupDto) {
    try {
      const isUserExist = await this.usersRepo.exists({
        where: [{ email: signupData.email }, { phoneNumber: signupData.phoneNumber }],
      });

      if (isUserExist) {
        throw new RpcException({ status: status.ALREADY_EXISTS, message: 'Email or phone number already exists' });
      }

      const { id } = await this.usersRepo.save(this.usersRepo.create(signupData));

      const tokens = await this.issueTokens({ id });
      return new ResponseBuilder().status(201).message('Welcome aboard! Your account has been created. Log in now to get started.').data(tokens).build();
    } catch (err) {
      if (err instanceof RpcException) throw err;
      throw new RpcException({ code: status.INTERNAL, message: 'Signup failed' });
    }
  }

  async forgotPassword(forgotDto: ForgotDto) {
    try {
      const existingUser = await this.usersRepo.findOne({
        where: { email: forgotDto.email },
      });

      if (!existingUser) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'User with this email does not exist',
        });
      }

      const resetToken = randomBytes(32).toString('hex');

      existingUser.passwordResetToken = resetToken;
      existingUser.passwordResetExpires = new Date(Date.now() + 1000 * 60 * 15);

      await this.usersRepo.save(existingUser);

      return new ResponseBuilder().status(200).message('Password reset link has been sent to your email.').data(null).build();
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error?.message || 'An error occurred while processing forgot password',
      });
    }
  }

  async resetPassword(data: ResetPasswordDto) {
    console.log(data);
    try {
      const existingUser = await this.usersRepo.findOne({
        where: { passwordResetToken: data.token },
      });

      console.log(existingUser);

      if (!existingUser || !existingUser.passwordResetExpires || existingUser.passwordResetExpires < new Date()) {
        throw new RpcException({
          code: status.INVALID_ARGUMENT,
          message: 'Invalid or expired token',
        });
      }

      existingUser.password = await hashValue(data.newPassword);
      existingUser.passwordResetExpires = null;
      existingUser.passwordResetToken = null;

      await this.usersRepo.save(existingUser);

      return new ResponseBuilder().status(200).message('Your password has been reset successfully.').build();
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: error?.message || 'An error occurred while resetting password',
      });
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const { id } = this.jwtService.verify(refreshToken, { secret: JWT_REFRESH_SECRET });

      const storedHash = await this.getRefreshTokenHash(id);
      if (!storedHash) {
        throw new RpcException({ code: status.INVALID_ARGUMENT, message: 'No refresh token found' });
      }

      const isMatch = await valueCompare(refreshToken, storedHash);

      if (!isMatch) {
        throw new RpcException({ code: status.UNAUTHENTICATED, message: 'Invalid refresh token' });
      }

      const tokens = await this.issueTokens({ id });

      return new ResponseBuilder().status(200).message('Your refresh token has been validated successfully.').data(tokens).build();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new RpcException({ code: status.UNAUTHENTICATED, message: 'Refresh token expired' });
      }
      if (err instanceof RpcException) throw err;
      throw new RpcException({ code: status.UNAUTHENTICATED, message: 'Invalid refresh request' });
    }
  }

  async login(data: any) {
    try {
      const user = await this.validateCredentials(data.email, data.password);
      if (!user?.id) {
        throw new RpcException({ code: status.INVALID_ARGUMENT, message: 'Invalid credentials' });
      }

      const tokens = await this.issueTokens({ id: user.id });

      return new ResponseBuilder().status(200).message('Welcome aboard! You have successfully logged in.').data(tokens).build();
    } catch (err) {
      if (err instanceof RpcException) throw err;
      throw new RpcException({ code: status.INTERNAL, message: 'Login failed' });
    }
  }

  private async issueTokens(payload: { id: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT_ACCESS_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXP,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXP,
    });

    await this.updateRefreshTokenHash(payload.id, await hashValue(refreshToken));

    return { accessToken, refreshToken };
  }

  async validateCredentials(email: string, plainPassword: string): Promise<Partial<UserEntity> | null> {
    const user = await this.usersRepo.createQueryBuilder('user').addSelect('user.password').where('user.email = :email', { email }).getOne();

    if (!user) return null;

    const isMatch = await valueCompare(plainPassword, user.password);
    if (!isMatch) return null;

    return user;
  }

  async getRefreshTokenHash(userId: string): Promise<string | null> {
    const user = await this.usersRepo.findOne({
      where: { id: userId },
      select: ['currentHashedRefreshToken'],
    });

    return user?.currentHashedRefreshToken || null;
  }

  async updateRefreshTokenHash(userId: string, hash: string): Promise<void> {
    await this.usersRepo.update(userId, { currentHashedRefreshToken: hash });
  }

  async clearRefreshToken(userId: string): Promise<void> {
    await this.usersRepo.update({ id: userId }, { currentHashedRefreshToken: null });
  }
}

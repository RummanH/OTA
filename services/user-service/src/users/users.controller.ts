import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { SignupDto } from '../common/dtos/signup.dto';
import { SigninDto } from '../common/dtos/signin.dto';
import { RefreshTokenDto } from 'src/common/dtos/refresh.dto';
import { status } from '@grpc/grpc-js';
import { ForgotDto } from 'src/common/dtos/forgot.dto';
import { ResetPasswordDto } from 'src/common/dtos/reset-password.dto';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @GrpcMethod('UserService', 'SignUp')
  signup(data: any) {
    return this.userService.signup(data);
  }

  @GrpcMethod('UserService', 'Login')
  login(data: SigninDto) {
    return this.userService.login(data);
  }

  @GrpcMethod('UserService', 'Refresh')
  async refresh(data: RefreshTokenDto) {
    return await this.userService.refreshTokens(data.refreshToken);
  }

  @GrpcMethod('UserService', 'ForgotPassword')
  async forgotPassword(data: ForgotDto) {
    return await this.userService.forgotPassword(data);
  }

  @GrpcMethod('UserService', 'ResetPassword')
  async resetPassword(data: ResetPasswordDto) {
    return await this.userService.resetPassword(data);
  }
}

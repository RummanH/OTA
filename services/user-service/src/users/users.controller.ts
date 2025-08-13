import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { SignupDto } from '../common/dtos/signup.dto';
import { SigninDto } from '../common/dtos/signin.dto';
import { RefreshTokenDto } from 'src/common/dtos/refresh.dto';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @GrpcMethod('UserService', 'Signup')
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
}

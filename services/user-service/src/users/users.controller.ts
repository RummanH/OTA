import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { status } from '@grpc/grpc-js';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @GrpcMethod('UserService', 'Signup')
  signup(data: SignupDto) {
    return this.userService.signup(data);
  }

  @GrpcMethod('UserService', 'Login')
  login(data: SigninDto) {
    return this.userService.login(data);
  }
}

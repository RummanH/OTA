import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @GrpcMethod('UserService', 'Register')
  // register(payload: SignupDto) {
  //   return this.userService.register(payload);
  // }

  // @GrpcMethod('UserService', 'Login')
  // login(payload: SigninDto) {
  //   return this.userService.login(payload);
  // }

  @GrpcMethod('UserService', 'getAll')
  getAll() {
    return this.userService.findAll();
  }
}

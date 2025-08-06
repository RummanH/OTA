// user.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';
import { User } from './user.entity';
import { SigninDto } from './dto/signin.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() body: SignupDto): Promise<Partial<User>> {
    return this.userService.signup(body);
  }

  @Post('signin')
  async signin(@Body() signinDto: SigninDto) {
    return this.userService.signin(signinDto);
  }
}

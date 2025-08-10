import { Body, Controller, Get, Post } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() signupDto: any) {
    return this.usersService.signup(signupDto);
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    return this.usersService.login(loginDto);
  }
}

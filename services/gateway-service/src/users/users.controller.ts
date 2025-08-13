import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshTokenDto } from 'src/common/dtos/refresh.dto';

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

  @Post('refreshToken')
  async refreshToken(@Body() RefreshTokenDto: any) {
    return this.usersService.refresh(RefreshTokenDto);
  }
}

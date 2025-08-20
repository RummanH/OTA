import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshTokenDto } from 'src/common/dtos/refresh.dto';
import type { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signup(@Body() signupDto: any) {
    return this.usersService.signup(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: any) {
    return this.usersService.login(loginDto);
  }

  @Post('refreshToken')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.usersService.refreshToken(refreshTokenDto);
  }

  @Post('forgotPassword')
  forgotPassword(@Body() forgotDto: any) {
    return this.usersService.forgotPassword(forgotDto);
  }

  @Post('resetPassword')
  resetPassword(@Body() forgotDto: any) {
    return this.usersService.resetPassword(forgotDto);
  }
}

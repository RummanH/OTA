import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RefreshTokenDto } from 'src/common/dtos/refresh.dto';

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
}

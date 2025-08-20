import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { IUserService } from 'src/common/interfaces/users.proto';

@Injectable()
export class UsersService {
  private userService: IUserService;

  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>('UserService');
  }

  async signup(data: any) {
    return this.userService.SignUp(data);
  }

  login(data: any) {
    return this.userService.Login(data);
  }

  refreshToken(data: any) {
    return this.userService.Refresh(data);
  }

  forgotPassword(data: any) {
    return this.userService.ForgotPassword(data);
  }

  resetPassword(data: any) {
    return this.userService.ResetPassword(data);
  }
}

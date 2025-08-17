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
    return await this.userService.Signup(data);
  }

  async login(data: any) {
    return await this.userService.Login(data);
  }

  async refreshToken(data: any) {
    return await this.userService.Refresh(data);
  }
}

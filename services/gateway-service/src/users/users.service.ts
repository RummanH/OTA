import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from 'src/common/constants';
import { IUserService } from 'src/common/interfaces/users.proto';

@Injectable()
export class UsersService {
  private userService: IUserService;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<IUserService>(USER_SERVICE_NAME);
  }

  async signup(data: any) {
    return await this.userService.Signup(data);
  }

  async login(data: any) {
    return await this.userService.Login(data);
  }

  async refresh(data: any) {
    return await this.userService.Refresh(data);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { USER_SERVICE_NAME } from 'src/common/constants';
import { Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserListResponse {
  users: User[];
}

interface UserService {
  getAll(data: {}): Observable<UserListResponse>;
}

@Injectable()
export class UsersService {
  private userService: UserService;

  constructor(@Inject(USER_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>(USER_SERVICE_NAME);
  }

  getAllUsers() {
    return this.userService.getAll({});
  }
}

import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAllUsers(): Observable<{ users: { id: string; name: string; email: string }[] }> {
    return this.usersService.getAllUsers()
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}

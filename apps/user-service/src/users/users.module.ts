import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { userProviders } from '../database/users.providers';

@Module({
  imports: [JwtModule],
  providers: [UsersService, ...userProviders],
  controllers: [UsersController],
})
export class UsersModule {}

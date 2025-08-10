import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { userProviders } from '../database/users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [...userProviders, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

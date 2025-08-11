import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { USER_REPOSITORY } from 'src/common/constants';
import { DataSource } from 'typeorm';
import { UserEntity } from './users.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
      inject: ['DATA_SOURCE'],
    },

    UsersService,
    ConfigService
  ],
  controllers: [UsersController],
})
export class UsersModule {}

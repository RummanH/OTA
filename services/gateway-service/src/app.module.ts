import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { FlightsModule } from './flights/flights.module';
import { GrpcToHttpInterceptor } from './common/interceptors/grpc.interceptors';

@Module({
  imports: [UsersModule, FlightsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcToHttpInterceptor,
    }
  ],
})
export class AppModule {}

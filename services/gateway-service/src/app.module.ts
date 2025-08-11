import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcToHttpInterceptor } from './common/interceptors/grpc.interceptors';
import { FlightsService } from './flights/flights.service';
import { FlightsModule } from './flights/flights.module';

@Module({
  imports: [UsersModule, FlightsModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcToHttpInterceptor,
    },
    FlightsService,
  ],
})
export class AppModule {}

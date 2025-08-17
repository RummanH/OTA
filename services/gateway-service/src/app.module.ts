import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { FlightsModule } from './flights/flights.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AirportsModule } from './airports/airports.module';

@Module({
  imports: [
    UsersModule,
    FlightsModule,
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 10 }],
    }),
    AirportsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}

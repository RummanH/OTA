import { Module } from '@nestjs/common';
import { VendorModule } from './vendor/vendor.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [VendorModule],
  providers: [],
})
export class AppModule {}

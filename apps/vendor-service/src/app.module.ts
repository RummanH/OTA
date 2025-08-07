import { Module } from '@nestjs/common';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [VendorModule],
})
export class AppModule {}

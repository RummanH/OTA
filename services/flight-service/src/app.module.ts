import { Module } from '@nestjs/common';
import { VendorModule } from './vendor/vendor.module';
import { AirportsModule } from './airports/airports.module';

@Module({
  imports: [VendorModule, AirportsModule],
  providers: [],
})
export class AppModule {}

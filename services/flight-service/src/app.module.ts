import { Module } from '@nestjs/common';
import { VendorModule } from './vendor/vendor.module';
import { AirportsModule } from './airports/airports.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    VendorModule,
    AirportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { SabreService } from './sabre.service';
import { VendorController } from './vendor.controller';
import { VendorHttpService } from './vendor-http.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [VendorController],
  providers: [VendorHttpService, VendorService, SabreService], // ✅ no need for HttpService here
})
export class VendorModule {}

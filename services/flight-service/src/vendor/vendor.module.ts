import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { HttpModule } from '@nestjs/axios';
import { ExpressModule } from './adapters/express/express.module';

@Module({
  imports: [ExpressModule],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}

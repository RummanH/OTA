import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExpressConfig } from './express.config';
import { ExpressClient } from './express.client';
import { ExpressMapper } from './express.mapper';

@Module({
  imports: [HttpModule],
  providers: [ExpressConfig, ExpressMapper, ExpressClient],
  exports: [ExpressClient],
})
export class ExpressModule {}

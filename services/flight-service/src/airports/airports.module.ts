import { Module } from '@nestjs/common';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Airport, AirportSchema } from './airports.schema';

@Module({
  controllers: [AirportsController],
  providers: [AirportsService],
  imports: [DatabaseModule, MongooseModule.forFeature([{ name: Airport.name, schema: AirportSchema }])],
})
export class AirportsModule {}

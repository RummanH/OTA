import path, { join } from 'node:path';

import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FLIGHT_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'flight',
          protoPath: join(__dirname, '..', 'protos', 'flights.proto'),
          url: 'localhost:5001',
        },
      },
      {
        name: 'AIRPORT_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'airport',
          protoPath: join(__dirname, '..', 'protos', 'airports.proto'),
          url: 'localhost:5001',
        },
      },
    ]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}

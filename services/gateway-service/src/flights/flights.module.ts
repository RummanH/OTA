import path from 'node:path';

import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FlightService',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: path.join(__dirname, '..', 'protos', 'flights.proto'),
          url: 'localhost:5001',
        },
      },
    ]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}

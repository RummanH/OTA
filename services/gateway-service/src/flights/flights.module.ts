import path from 'node:path';

import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FLIGHT_SERVICE_GRPC_URL, FLIGHT_SERVICE_NAME, FLIGHT_SERVICE_PACKAGE_NAME } from 'src/common/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FLIGHT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          package: FLIGHT_SERVICE_PACKAGE_NAME,
          protoPath: path.join(__dirname, '..', 'protos', 'flights.proto'),
          url: FLIGHT_SERVICE_GRPC_URL,
        },
      },
    ]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}

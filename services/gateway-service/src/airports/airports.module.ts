import { Module } from '@nestjs/common';
import { AirportsController } from './airports.controller';
import { AirportsService } from './airports.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FLIGHT_SERVICE_GRPC_URL } from 'src/common/constants';
import path from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AirportService',
        transport: Transport.GRPC,
        options: {
          package: 'airport',
          protoPath: [path.join(__dirname, '..', 'protos', 'airports.proto')],
          url: FLIGHT_SERVICE_GRPC_URL,
        },
      },
    ]),
  ],
  controllers: [AirportsController],
  providers: [AirportsService],
})
export class AirportsModule {}

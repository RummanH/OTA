import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FLIGHT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'flight',
            protoPath: join(__dirname, '..', 'protos', 'flights.proto'),
            url: configService.get<string>('FLIGHT_SERVICE_GRPC_URL'),
          },
        }),
      },
      {
        name: 'AIRPORT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'airport',
            protoPath: join(__dirname, '..', 'protos', 'airports.proto'),
            url: configService.get<string>('FLIGHT_SERVICE_GRPC_URL')
          },
        }),
      },
    ]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}

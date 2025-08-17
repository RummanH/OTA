import path from 'node:path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { FLIGHT_SERVICE_GRPC_URL, FLIGHT_SERVICE_PACKAGE_NAME } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: [FLIGHT_SERVICE_PACKAGE_NAME, 'airport'],
      protoPath: [path.join(__dirname, '.', 'protos', 'flights.proto'), path.join(__dirname, '.', 'protos', 'airports.proto')],
      protoLoader: '@grpc/proto-loader',
      url: FLIGHT_SERVICE_GRPC_URL,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  await app.listen();
  console.log(`Flight service is running on gRPC server at ${FLIGHT_SERVICE_GRPC_URL}`);
}

bootstrap();

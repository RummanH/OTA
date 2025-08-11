// Core Modules
import path from 'node:path';

// Third-party Modules
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

// Own Modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'flight',
      protoPath: path.join(__dirname, '.', 'protos', 'flights.proto'),
      protoLoader: '@grpc/proto-loader',
      url: 'localhost:5001',
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  await app.listen();
  console.log(`Flight service is running on gRPC server at localhost:5001`);
}

bootstrap();

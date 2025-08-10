// Core Modules
import path from 'node:path';

// Third-party Modules
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

// Own Modules
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: path.join(__dirname, '.', 'protos', 'users.proto'),
      protoLoader: '@grpc/proto-loader',
      url: config().grpcUrl,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  await app.listen();
  console.log(`🚀 User-service running on gRPC server at ${config().grpcUrl}`);
}

bootstrap();

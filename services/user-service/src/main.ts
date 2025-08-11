
import path from 'node:path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { USER_SERVICE_GRPC_URL, USER_SERVICE_PACKAGE_NAME } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: USER_SERVICE_PACKAGE_NAME,
      protoPath: path.join(__dirname, '.', 'protos', 'users.proto'),
      protoLoader: '@grpc/proto-loader',
      url: USER_SERVICE_GRPC_URL,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  await app.listen();
  console.log(`🚀 User-service running on gRPC server at ${USER_SERVICE_GRPC_URL}`);
}

bootstrap();

import path from 'node:path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Create gRPC microservice
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ['flight', 'airport'],
      protoPath: [path.join(__dirname, 'protos', 'flights.proto'), path.join(__dirname, 'protos', 'airports.proto')],
      url: configService.get<string>('FLIGHT_SERVICE_GRPC_URL'),
    },
  });

  grpcApp.enableShutdownHooks();

  await grpcApp.listen();
  console.log(`Flight service is running on gRPC at ${configService.get<string>('FLIGHT_SERVICE_GRPC_URL')}`);
}

bootstrap();

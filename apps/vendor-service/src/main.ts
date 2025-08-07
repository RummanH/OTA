// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Transport, MicroserviceOptions } from '@nestjs/microservices';
// import { RABBITMQ_URL, VENDOR_QUEUE } from './shared/constants';

// async function bootstrap() {
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.RMQ,
//       options: {
//         urls: [RABBITMQ_URL],
//         queue: VENDOR_QUEUE,
//         queueOptions: {
//           durable: false,
//         },
//       },
//     },
//   );

//   await app.listen();
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();

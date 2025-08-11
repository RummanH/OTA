import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  await app.listen(SERVER_PORT);
  console.log(`Gateway service is running on port: ${SERVER_PORT}`);
}

bootstrap();

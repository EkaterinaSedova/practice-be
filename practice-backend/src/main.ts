import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log(`started on port ${process.env.PORT}`)
}
bootstrap();

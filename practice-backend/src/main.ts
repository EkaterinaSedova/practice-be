import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
      .setTitle('PRACTICE')
      .setDescription('The practice API description')
      .setVersion('1.0')
      .addBearerAuth(
          {
              // I was also testing it without prefix 'Bearer ' before the JWT
              description: `[just text field] Please enter token in following format: Bearer <JWT>`,
              name: 'Authorization',
              bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
              scheme: 'Bearer',
              type: 'http', // I`ve attempted type: 'apiKey' too
              in: 'Header'
          },
          'access-token',
      )
      .addTag('practice')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log(`started on port ${process.env.PORT}`)
}
bootstrap();

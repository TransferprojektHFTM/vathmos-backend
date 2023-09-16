import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { Config } from './config/config';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Swagger Documentation Vathmos')
    .setDescription('The Vathmos API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Config.DocsRoute, app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });
  //Generate .json API Documentation (easly import to Restlet Studio etc...)
  generateSwaggerJSONFile(document);
}
bootstrap();
async function generateSwaggerJSONFile(swaggerDocument: OpenAPIObject) {
  await fs.writeFile(
    './api/swagger2.json',
    JSON.stringify(swaggerDocument, null, 4),
    (err) => {
      if (err) throw err;
    },
  );
}

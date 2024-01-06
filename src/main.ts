import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Config } from './config/config';
import { join } from 'path';
import { AppCustomLogger } from './app.custom.logger';

async function bootstrap() {
  const logger = new AppCustomLogger('Main');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.useStaticAssets(join(__dirname, '../public'));
  app.setGlobalPrefix(Config.GlobalRoutePrefix);

  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .addTag('Person', 'Student and lecturer management')
    .addTag('Settings', 'optional for course administrators')
    .addTag('Exam', 'Exams management')
    .addTag('Student class', 'Student class management')
    .addTag('Role', 'Roles management')
    .addTag('Vathmos Logs', 'Show logs from Vathmos Backend (only for KursAdmin)')
    .addBearerAuth()
    .setTitle('Swagger Documentation Vathmos')
    .setDescription('The Vathmos API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Config.DocsRoute, app, document, {
    customSiteTitle: 'Vathmos API',
    swaggerOptions: {
      docExpansion: 'none',
      path: './api/swagger2.json',
    },
  });
  //Generate .json API Documentation (easly import to Restlet Studio etc...)
  generateSwaggerJSONFile(document);

  await app.listen(configService.get<number>('PORT') || 3000, () => {
    logger.log(
      `[VATHMOS-BACKEND] -> Server is listening on port ${configService.get<number>(
        'PORT',
      )}`,
    );
  });
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

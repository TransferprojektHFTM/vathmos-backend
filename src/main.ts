import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { Config } from './config/config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '../public'));
  app.setGlobalPrefix(Config.GlobalRoutePrefix);

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
      path: './api/swagger2.json'
    }
  });
  //Generate .json API Documentation (easly import to Restlet Studio etc...)
  generateSwaggerJSONFile(document);

  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      '[VATHMOS-BACKEND] -> ',
      'Server is listening on port',
      Config.Port
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

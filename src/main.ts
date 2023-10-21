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
    .addTag('Person', 'Student and lecturer management')
    .addBearerAuth()
    // .addOAuth2(
    //   {
    //     type: 'oauth2',
    //     description: 'description',
    //     name: 'AzureAD',
    //     flows: {
    //       implicit: {
    //         scopes: { 'User.Read': 'Read user profile', token: 'get token' },
    //         authorizationUrl: `https://login.microsoftonline.com/7a09aace-3641-41b0-993d-3729201228b3/oauth2/v2.0/authorize`,
    //       },
    //     },
    //   },
    //   'AzureAD',
    // )
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
      // oauth2RedirectUrl:
      //   'https://login.microsoftonline.com/7a09aace-3641-41b0-993d-3729201228b3',
      // initOAuth: {
      //   clientId: '231651f3-70c5-48b9-aa2e-460754d77d58',
      //   clientSecret: 'JfY8Q~vwtC3ciTYPbo.kXyNVwY.FBXMNENkmpbUT',
      //   scopes: ['User.Read', 'access_token'],
      //   appName: 'hftm-vathmos',
      // },
    },
  });
  //Generate .json API Documentation (easly import to Restlet Studio etc...)
  generateSwaggerJSONFile(document);

  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      '[VATHMOS-BACKEND] -> ',
      'Server is listening on port',
      Config.Port,
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

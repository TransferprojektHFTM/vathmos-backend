import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './models/person/person.module';
import { CourseModule } from './models/course/course.module';
import { HftmClassModule } from './models/hftm-class/hftm-class.module';
import { HftmModuleModule } from './models/hftm-module/hftm-module.module';
import { HftmModulePartModule } from './models/hftm-module-part/hftm-module-part.module';
import { ExamModule } from './models/exam/exam.module';
import { EvaluationModule } from './models/evaluation/evaluation.module';
import { ModulTypModule } from './models/modul-typ/modul-typ.module';
import { JwtService } from '@nestjs/jwt';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { VathmosAuthGuard } from './auth-guard/vathmos-auth-guard';
import { ModulePlanModule } from './models/module-plan/module-plan.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppCustomLogger } from './app.custom.logger';
import { NotFoundExceptionFilter } from './common/NotFoundExceptionFilter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USER'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: true,
        subscribers: [],
        migrations: [],
      }),
      inject: [ConfigService],
    }),
    PersonModule,
    CourseModule,
    HftmClassModule,
    HftmModuleModule,
    HftmModulePartModule,
    ExamModule,
    EvaluationModule,
    ModulTypModule,
    ModulePlanModule,
  ],
  controllers: [],
  providers: [
    JwtService,
    AppCustomLogger,
    {
      provide: APP_GUARD,
      useClass: VathmosAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
  exports: [],
})
export class AppModule {}

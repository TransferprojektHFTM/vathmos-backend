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
import { APP_GUARD } from '@nestjs/core';
import { VathmosAuthGuard } from './auth-guard/vathmos-auth-guard';
import { ModulePlanModule } from './models/module-plan/module-plan.module';
import { ConfigModule } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
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
    {
      provide: APP_GUARD,
      useClass: VathmosAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
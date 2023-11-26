import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './models/person/person.module';
import { CohortModule } from './models/cohort/cohort.module';
import { StudentClassModule } from './models/student-class/student-class.module';
import { CoreModuleModule } from './models/core-module/core-module.module';
import { SubjectModule } from './models/subject/subject.module';
import { ExamModule } from './models/exam/exam.module';
import { EvaluationModule } from './models/evaluation/evaluation.module';
import { ModuleTypeModule } from './models/module-type/module-type.module';
import { JwtService } from '@nestjs/jwt';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { DegreeModule } from './models/degree/degree.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppCustomLogger } from './app.custom.logger';
import { NotFoundExceptionFilter } from './common/NotFoundExceptionFilter';
import { RoleModule } from './models/role/role.module';
import { TaskService } from './services/task/task.service';
import { TaskModule } from './services/task/task.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    CohortModule,
    StudentClassModule,
    CoreModuleModule,
    SubjectModule,
    ExamModule,
    EvaluationModule,
    ModuleTypeModule,
    DegreeModule,
    RoleModule,
    TaskModule,
  ],
  controllers: [],
  providers: [
    JwtService,
    AppCustomLogger,
    // {
    //   provide: APP_GUARD,
    //   useClass: VathmosAuthGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    TaskService,
  ],
  exports: [],
})
export class AppModule {}

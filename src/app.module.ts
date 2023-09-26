import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { CourseModule } from './course/course.module';
import { HftmClassModule } from './hftm-class/hftm-class.module';
import { HftmModuleModule } from './hftm-module/hftm-module.module';
import { HftmModulePartModule } from './hftm-module-part/hftm-module-part.module';
import { ExamModule } from './exam/exam.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { ModulTypModule } from './modul-typ/modul-typ.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'vathmos',
      password: 'NotenAPIVathmos2023+',
      database: 'db_vathmos',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PersonModule,
    CurriculumModule,
    CourseModule,
    HftmClassModule,
    HftmModuleModule,
    HftmModulePartModule,
    ExamModule,
    EvaluationModule,
    ModulTypModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

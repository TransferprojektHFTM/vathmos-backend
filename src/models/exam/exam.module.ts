import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Exam } from './entities/exam.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../subject/entities/subject.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Exam]),
      TypeOrmModule.forFeature([Subject]),
    ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}

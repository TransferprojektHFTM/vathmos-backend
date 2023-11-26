import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppCustomLogger } from '../../app.custom.logger';
import { Subject } from '../subject/entities/subject.entity';

@Injectable()
export class ExamService {
  private readonly logger = new AppCustomLogger(ExamService.name);

  constructor(@InjectRepository(Exam) private readonly examRepository: Repository<Exam>, @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>){
  }

  async create(createExamDto: CreateExamDto): Promise<Exam>{
    if(createExamDto.name === undefined || createExamDto.weighting === undefined) {
      this.logger.warn(`Exam [create] does not have a name or weighting!`);
      throw new Error(`Exam [create] does not have a name or weighting!`);
    }
    const exam = new Exam();
    exam.name = createExamDto.name;
    exam.weighting = createExamDto.weighting;
    // exam.modulpart = createExamDto.modulpart; // hier noch probleme mit modulpart
    return this.examRepository.save(exam);
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  async findOne(id: number): Promise<Exam | undefined> {
    const entity = await this.examRepository.findOne({where: {id}});
    if(!entity) {
      this.logger.warn(`Exam with id ${id} not found`);
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateExamDto: UpdateExamDto): Promise<Exam> {
    const existingExam = await this.examRepository.findOne({where: {id}});
    if(!existingExam) {
      this.logger.warn(`Exam with id ${id} not found`);
      throw new NotFoundException(`Exam with id ${id} not found`);
    }
    existingExam.name = updateExamDto.name;
    existingExam.weighting = updateExamDto.weighting;
    // existingExam.modulpart = updateExamDto.modulpart; // hier noch probleme mit modulpart
    return this.examRepository.save(existingExam);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.examRepository.delete(id);
    if(deleteResult.affected === 1) {
      this.logger.log(`Exam with id ${id} deleted`);
      //return {message: `Exam with id ${id} deleted`, status: 200};
    }else{
      throw new NotFoundException(`Exam with id ${id} not found`);
    }
  }

  // @ToDo: Check ob dies so funktioniert sobald Subjetcs fertig sind für create and update
  async getExamsBySubject(subject: Subject): Promise<Exam[]> {
    const subjectWithExams = await this.subjectRepository
        .createQueryBuilder('subject')
        .leftJoinAndSelect('subject.exams', 'exam')
        .where('subject.id = :subjectId', { subjectId: subject.id })
        .getOne();
    if (!subjectWithExams) {
      // Case wenn Subject keine Exams hat
      return [];
    }

    // Case wenn Subject Exams hat nicht über 100%
    const filteredExams = subjectWithExams.exams.filter(exam =>
        this.isTotalWeightingValid([exam]),
    );

    return filteredExams;
  }

  // @ToDo: Check ob dies so funktioniert sobald Subjetcs fertig sind für create and update
  private isTotalWeightingValid(exams: Exam[]): boolean {
    const totalWeighting = exams.reduce(
        (sum, exam) => sum + parseFloat(exam.weighting),
        0,
    );

    return totalWeighting <= 100;
  }
}

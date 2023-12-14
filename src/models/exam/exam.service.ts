import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppCustomLogger } from '../../app.custom.logger';
import { Subject } from '../subject/entities/subject.entity';

function isExamUndefined(createExamDto: CreateExamDto) {
  return createExamDto.name === undefined || createExamDto.weighting === undefined;
}

function isExamEmpty(createExamDto: CreateExamDto) {
  return createExamDto.name === "" || createExamDto.weighting === "";
}

@Injectable()
export class ExamService {
  private readonly logger = new AppCustomLogger(ExamService.name);

  constructor(@InjectRepository(Exam) private readonly examRepository: Repository<Exam>, @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>){
  }

  async create(createExamDto: CreateExamDto): Promise<Exam | Error>{
    if(isExamUndefined(createExamDto) || isExamEmpty(createExamDto)) {
      this.logger.warn(`Exam [create] does not have a name or weighting!`);
      throw new Error(`Exam [create] does not have a name or weighting!`);
    }
    const exam = new Exam();
    exam.name = createExamDto.name;
    exam.weighting = createExamDto.weighting;
    exam.modulpart = createExamDto.modulpart;
    return this.examRepository.save(exam);
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find({ relations: ['modulpart'] });
  }

  async findOne(id: number): Promise<Exam | NotFoundException> {
    const entity = await this.examRepository.findOne({where: {id}, relations: ['modulpart']});
    if(!entity) {
      this.logger.warn(`Exam with id ${id} not found`);
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateExamDto: UpdateExamDto): Promise<Exam | NotFoundException | Error> {
    const existingExam = await this.examRepository.findOne({where: {id}});
    if(!existingExam) {
      this.logger.warn(`Exam with id ${id} not found`);
      throw new NotFoundException(`Exam with id ${id} not found`);
    }else if(isExamUndefined(updateExamDto) || isExamEmpty(updateExamDto)){
        this.logger.warn(`Exam [update] does not have a name or weighting!`);
        throw new Error(`Exam [update] does not have a name or weighting!`);
    }
    existingExam.name = updateExamDto.name;
    existingExam.weighting = updateExamDto.weighting;
    existingExam.modulpart = updateExamDto.modulpart;
    return this.examRepository.save(existingExam);
  }

  async remove(id: number): Promise<Exam | NotFoundException> {
    const findDeletedExam = await this.examRepository.findOne({where: {id}});
    if(!findDeletedExam) {
      this.logger.warn(`Exam with id ${id} not found`);
      throw new NotFoundException(`Exam with id ${id} not found`);
    }else{
      await this.examRepository.delete(id)
      return findDeletedExam;
    }
  }
}

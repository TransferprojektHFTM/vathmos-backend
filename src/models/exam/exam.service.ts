import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppCustomLogger } from '../../app.custom.logger';

@Injectable()
export class ExamService {
  private readonly logger = new AppCustomLogger(ExamService.name);

  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam | Error> {
    const exam = new Exam();
    exam.name = createExamDto.name;
    exam.weighting = createExamDto.weighting;
    exam.subject = createExamDto.subject;
    return this.examRepository.save(exam);
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find({ relations: ['subject'] });
  }

  async findOne(id: number): Promise<Exam | NotFoundException> {
    const entity = await this.examRepository.findOne({
      where: { id },
      relations: ['subject'],
    });
    if (!entity) {
      this.logger.warn(`Exam with id ${id} not found`);
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async findBySubject(subjectId: number): Promise<Exam[] | NotFoundException> {
    console.log('subjectId', subjectId);
    const entity =  await this.examRepository.find({ where: { subject: { id: subjectId } }, relations: ['subject'] });
    console.log(entity)
    if(!entity || entity.length === 0) {
      this.logger.warn(`Exam with subjectId ${subjectId} not found`);
      throw new NotFoundException(`Entity with subjectId ${subjectId} not found`);
    }
    return entity;
  }

  async update(
    id: number,
    updateExamDto: UpdateExamDto,
  ): Promise<Exam | NotFoundException | Error> {
    const existingExam = await this.examRepository.findOne({ where: { id } });
    existingExam.name = updateExamDto.name;
    existingExam.weighting = updateExamDto.weighting;
    existingExam.subject = updateExamDto.subject;
    return this.examRepository.save(existingExam);
  }

  // @todo return exam when deleted?
  async remove(id: number): Promise<Exam | NotFoundException> {
    const findDeletedExam = await this.examRepository.findOne({
      where: { id },
    });
    if (!findDeletedExam) {
      this.logger.warn(`Exam with id ${id} not found`);
      throw new NotFoundException(`Exam with id ${id} not found`);
    } else {
      await this.examRepository.delete(id);
      return findDeletedExam;
    }
  }
}

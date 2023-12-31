import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppCustomLogger } from '../../app.custom.logger';
import {parse} from "ts-jest";

@Injectable()
export class ExamService {
  private readonly logger = new AppCustomLogger(ExamService.name);
  private TWO_DECIMAL_PLACES = 2;

  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam | BadRequestException | Error> {
    // @todo check if subject exists and fix subjectId type number
    const subjectId: any = createExamDto.subject;
    const entity = await this.examRepository.find({
      where: { subject: {id: subjectId }},
      relations: ['subject'],
    });
    const remainingWeighting: number = this.getRemainingWeighting(entity);
    const parsedCreateExamDto = parseFloat(createExamDto.weighting.replace('%', ''));
    if(parsedCreateExamDto <= remainingWeighting){
      const exam = new Exam();
      exam.name = createExamDto.name;
      exam.weighting = `${parseFloat(String(parsedCreateExamDto)).toFixed(this.TWO_DECIMAL_PLACES)}%`;
      exam.subject = createExamDto.subject;
      return this.examRepository.save(exam);
    }else{
      this.logger.warn(`The exam has ${remainingWeighting}% left in this subject ${subjectId}. Exam not created`);
      throw new BadRequestException(`The exam has ${remainingWeighting}% left in this subject ${subjectId}. Exam not created!`);
    }
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


  getRemainingWeighting(exams: Exam[]): number {
    const maxWeighting: number = 100.00;
    let weighting: number = 0;
    exams.forEach((exam) => {
      weighting += parseFloat(exam.weighting.replace('%', ''));
    });
    return parseFloat((maxWeighting - weighting).toFixed(this.TWO_DECIMAL_PLACES));
  }

  async findBySubject(subjectId: number): Promise<Exam[] | NotFoundException | BadRequestException> {
    const entity =  await this.examRepository.find({ where: { subject: { id: subjectId } }, relations: ['subject'] });
    if(!entity || entity.length === 0) {
      this.logger.warn(`Exam with subjectId ${subjectId} not found`);
      throw new NotFoundException(`Entity with subjectId ${subjectId} not found`);
    }
    return entity
  }

  parseWeighting(weighting: string): number{
    return parseFloat(weighting.replace('%', '')).toFixed(this.TWO_DECIMAL_PLACES) as unknown as number;
  }

  async update(
    id: number,
    updateExamDto: UpdateExamDto,
  ): Promise<Exam | NotFoundException | Error> {
    const subjectId: any = updateExamDto.subject;
    const subjectOfExams = await this.examRepository.find({
      where: { subject: {id: subjectId }},
      relations: ['subject'],
    });
    const parsedUpdateExamDto: number = this.parseWeighting(updateExamDto.weighting);
    let remainingWeighting: number = this.getRemainingWeighting(subjectOfExams);
    const existingExam = await this.examRepository.findOne({ where: { id } });
    remainingWeighting = parseFloat(existingExam.weighting) + parseFloat(remainingWeighting.toFixed(this.TWO_DECIMAL_PLACES));
    if(parsedUpdateExamDto <= remainingWeighting){
      existingExam.name = updateExamDto.name;
      existingExam.weighting = parsedUpdateExamDto.toString() + '%';
      existingExam.subject = updateExamDto.subject;
      return this.examRepository.save(existingExam);
    }else{
      this.logger.warn(`The exam has ${remainingWeighting}% left in this subject ${subjectId}. Exam not updated`);
      throw new BadRequestException(`The exam has ${remainingWeighting}% left in this subject ${subjectId}. Exam not updated!`);    }
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

import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AppCustomLogger } from '../../app.custom.logger';

@Injectable()
export class ExamService {
  private readonly logger = new AppCustomLogger(ExamService.name);
  private TWO_DECIMAL_PLACES = 2;

  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    // @todo check if subject exists and fix subjectId type number
    const subjectId: any = createExamDto.subject;
    const entity = await this.examRepository.find({
      where: { subject: {id: subjectId }},
      relations: ['subject'],
    });
    const remainingWeighting: number = parseFloat(this.getRemainingWeighting(entity));
    const parsedCreateExamDto = parseFloat(createExamDto.weighting.replace('%', ''));
    if(parsedCreateExamDto <= remainingWeighting){
      const exam = new Exam();
      exam.name = createExamDto.name;
      exam.weighting = `${parseFloat(String(parsedCreateExamDto)).toFixed(this.TWO_DECIMAL_PLACES)}%`;
      exam.subject = createExamDto.subject;
      return this.examRepository.save(exam);
    }else{
      this.logger.warn(`The exam has ${remainingWeighting}% left not ${parsedCreateExamDto}% in this subject ${subjectId}. Exam not created`);
      throw new NotAcceptableException(`The exam has ${remainingWeighting}% left not ${parsedCreateExamDto}% in this subject ${subjectId}. Exam not created!`);
    }
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find({ relations: ['subject'] });
  }

  async findOne(id: number): Promise<Exam> {
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

  getRemainingWeighting(exams: Exam[]): string {
    const maxWeighting: number = 100.00;
    let weighting: number = 0;
    exams.forEach((exam) => {
      weighting += parseFloat(exam.weighting.replace('%', ''));
    });
    return parseFloat(String(maxWeighting - weighting)).toFixed(this.TWO_DECIMAL_PLACES);
  }

  parseWeighting(weighting: string): number{
    return parseFloat(weighting.replace('%', '')).toFixed(this.TWO_DECIMAL_PLACES) as unknown as number;
  }

  async findBySubject(subjectId: number): Promise<Exam[]> {
    const entity =  await this.examRepository.find({ where: { subject: { id: subjectId } }, relations: ['subject'] });
    if(!entity || entity.length === 0) {
      this.logger.warn(`Exam with subjectId ${subjectId} not found`);
      throw new NotFoundException(`Entity with subjectId ${subjectId} not found`);
    }
    return entity
  }

  async update(
    id: number,
    updateExamDto: UpdateExamDto,
  ): Promise<Exam | NotFoundException | Error> {
    const subjectId: any = updateExamDto.subject;
    const subjectOfExams: Exam[] = await this.examRepository.find({
      where: { subject: {id: subjectId }},
      relations: ['subject'],
    });
    const parsedUpdateExamDto: number = this.parseWeighting(updateExamDto.weighting);
    const existingExam: Exam = await this.examRepository.findOne({
      where: { id },
      relations: ['subject']
    });
    // Sum of all exams by subject plus existingExam weigthing
    let remainingWeighting: number = parseFloat(this.getRemainingWeighting(subjectOfExams));
    // when subject id is same like exisingExam subject id
    const existSubjectId: number | undefined = existingExam?.subject?.id;
    const updateSubjectId: number = Number(updateExamDto.subject);
    if(existSubjectId === updateSubjectId){
      remainingWeighting += parseFloat(existingExam?.weighting);
    }
    if(!existingExam){
      this.logger.warn(`Exam [update] with id ${id} not found`);
      throw new NotFoundException(`Exam [update] with id ${id} not found`);
    }else if(parsedUpdateExamDto <= remainingWeighting) {
      existingExam.name = updateExamDto.name;
      existingExam.weighting = parsedUpdateExamDto.toString() + '%';
      existingExam.subject = updateExamDto.subject;
      return this.examRepository.save(existingExam);
    }else{
      this.logger.warn(`The exam has ${remainingWeighting}% left not ${parsedUpdateExamDto}% in this subject ${subjectId}. Exam not updated`);
      throw new NotAcceptableException(`The exam has ${remainingWeighting}% left not ${parsedUpdateExamDto}% in this subject ${subjectId}. Exam not updated!`);
    }
  }

  // @todo return exam when deleted?
  async remove(id: number): Promise<Exam> {
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

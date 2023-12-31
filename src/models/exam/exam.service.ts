import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
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

  async create(createExamDto: CreateExamDto): Promise<Exam | BadRequestException | Error> {
    // @todo check if subject exists and fix subjectId type number
    const subjectId: any = createExamDto.subject;
    const entity = await this.examRepository.find({
      where: { subject: {id: subjectId }},
      relations: ['subject'],
    });
    const remainingWeighting: number = this.getRemainingWeighting(entity);
    const parsedCreateExamDto = parseInt(createExamDto.weighting.replace('%', ''));
    if(parsedCreateExamDto <= remainingWeighting){
      const exam = new Exam();
      exam.name = createExamDto.name;
      exam.weighting = createExamDto.weighting;
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
    const maxWeighting: number = 100;
    let weighting: any = 0;
    exams.forEach((exam) => {
      weighting += parseInt(exam.weighting.replace('%', ''));
    });
    return maxWeighting - weighting;
  }

  async findBySubject(subjectId: number): Promise<Exam[] | NotFoundException | BadRequestException> {
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
    const subjectOfExams = await this.examRepository.find({
      where: { subject: {id: subjectId }},
      relations: ['subject'],
    });

    console.log("subjectId");
    console.log(subjectId);
    // console.log(subjectOfExams);
    const parsedUpdateExamDto = parseInt(updateExamDto.weighting.replace('%', ''));
    console.log("Eingabe");
    console.log(parsedUpdateExamDto);
    const remainingWeighting: number = this.getRemainingWeighting(subjectOfExams);
    console.log(remainingWeighting);
    if(parsedUpdateExamDto <= remainingWeighting){
      const existingExam = await this.examRepository.findOne({ where: { id } });
      existingExam.name = updateExamDto.name;
      existingExam.weighting = updateExamDto.weighting;
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

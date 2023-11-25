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


  constructor(@InjectRepository(Exam) private readonly examRepository: Repository<Exam>) {
  }
  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam';
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

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
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
}

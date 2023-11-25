import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExamService {

  constructor(@InjectRepository(Exam) private readonly examRepository: Repository<Exam>) {
  }
  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam';
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}

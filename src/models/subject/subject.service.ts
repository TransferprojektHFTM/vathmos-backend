import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { AppCustomLogger } from '../../app.custom.logger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  private readonly logger = new AppCustomLogger(SubjectService.name);

  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise <Subject> {
    const subject = new Subject();
    subject.name = createSubjectDto.name;
    subject.shortName = createSubjectDto.shortName;
    const existingSubject = await this.subjectRepository.findOne({
      where: { shortName: subject.shortName },
    });
    if (existingSubject) {
      console.error(`Subject with shortName ${subject.shortName} already exists.`);
      throw new NotAcceptableException('Duplicate entry. Please provide a unique shortName.');
    }else{
      return await this.subjectRepository.save(subject);
    }
  }

  async findAll(): Promise <Subject[]> {
    return this.subjectRepository.find({relations: ['exams', 'coreModules', 'lecturers']});
  }

  async findOne(id: number): Promise<Subject> {
    const entity = await this.subjectRepository.findOne({
      where: { id },
      relations: ['exams', 'coreModules', 'lecturers'],
    });

    if(!entity) {
      this.logger.warn(`Subject with id ${id} not found`);
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const existingSubject = await this.subjectRepository.findOne({where: {id}});
    existingSubject.name = updateSubjectDto.name;
    existingSubject.shortName = updateSubjectDto.shortName;
    return this.subjectRepository.save(existingSubject);
  }

  // @todo return subject when deleted?
  async remove(id: number): Promise<Subject> {
    const findDeletedSubject = await this.subjectRepository.findOne({
      where: {id},
    });
    if (!findDeletedSubject) {
      this.logger.warn(`Subject with id ${id} not found`);
      throw new NotFoundException(`Subject with id ${id} not found`);
    } else {
      await this.subjectRepository.delete(id);
      return findDeletedSubject;
    }
  }
}

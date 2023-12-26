import {Injectable, NotFoundException} from '@nestjs/common';
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
  async create(createSubjectDto: CreateSubjectDto): Promise <Subject | Error> {
    const subject = new Subject();
    subject.name = createSubjectDto.name;
    subject.shortName = createSubjectDto.shortName;
    return this.subjectRepository.save(subject);
  }

  // @todo refactoring? 26.12.2023 findAll does not work
  // findAll() {
  //   return this.subjectRepository
  //     .createQueryBuilder('subject')
  //     .select('*')
  //     .leftJoinAndSelect('subject.coreModule', 'coreModule')
  //     .leftJoinAndSelect('subject.lecturer', 'lecturer')
  //     .getMany();
  // }

  //@Todo only for dev findAll with querybuilder does not work up
  async findAll(): Promise <Subject[]> {
    return this.subjectRepository.find();
  }

  async findOne(id: number): Promise<Subject | NotFoundException> {
    const entity = await this.subjectRepository.findOne({
      where: { id },
    });

    if(!entity) {
      this.logger.warn(`Subject with id ${id} not found`);
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject | NotFoundException | Error> {
    const existingSubject = await this.subjectRepository.findOne({where: {id}});
    existingSubject.name = updateSubjectDto.name;
    existingSubject.shortName = updateSubjectDto.shortName;
    return this.subjectRepository.save(existingSubject);
  }

  async remove(id: number): Promise<Subject | NotFoundException> {
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

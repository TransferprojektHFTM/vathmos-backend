import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import {AppCustomLogger} from "../../app.custom.logger";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Subject} from "./entities/subject.entity";

@Injectable()
export class SubjectService {
  private readonly logger = new AppCustomLogger(SubjectService.name);

  constructor(@InjectRepository(Subject)
              private subjectRepository: Repository<Subject>,) {
  }
  create(createSubjectDto: CreateSubjectDto) {
    return 'This action adds a new subject';
  }

  findAll() {
    return this.subjectRepository.createQueryBuilder("subject")
        .select('*')
        .leftJoinAndSelect("subject.coreModule", "coreModule")
        .leftJoinAndSelect("subject.lecturer", "lecturer")
        .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}

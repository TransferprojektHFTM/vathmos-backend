import { Injectable } from '@nestjs/common';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Person} from "../person/entities/person.entity";
import {Repository} from "typeorm";
import {GraphApiService} from "../../providers/graph-api.service";
import {UserAccessService} from "../../providers/user-access.service";
import {StudentClass} from "./entities/student-class.entity";

@Injectable()
export class StudentClassService {

  constructor(
      @InjectRepository(StudentClass)
      private classRepository: Repository<StudentClass>,
      private graphApiService: GraphApiService,
      private userAccessService: UserAccessService,
  ) {}
  create(createStudentClassDto: CreateStudentClassDto) {
    return 'This action adds a new studentClass';
  }

  findAll() {
    return `This action returns all studentClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentClass`;
  }

  update(id: number, updateStudentClassDto: UpdateStudentClassDto) {
    return `This action updates a #${id} studentClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentClass`;
  }

  async createClasses() {
    let message = {message: ``, status: 500};
    const token = await this.userAccessService.getAccessToken();
    this.graphApiService.getClasses(token).then((studentClass: any[]) => {
      let count = 0;
      for (const classes of studentClass) {
        if (classes?.groupTypes.length == 0 && classes?.onPremisesDomainName === "hftm.ch" && classes?.mail !== null) {
          console.log(classes)
          count++;
        }
      }
      console.log(count)
    });
  }
}

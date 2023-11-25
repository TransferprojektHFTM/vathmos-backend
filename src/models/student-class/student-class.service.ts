import { Injectable } from '@nestjs/common';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GraphApiService} from "../../providers/graph-api.service";
import {UserAccessService} from "../../providers/user-access.service";
import {StudentClass} from "./entities/student-class.entity";
import {AppCustomLogger} from "../../app.custom.logger";

@Injectable()
export class StudentClassService {
  private readonly logger = new AppCustomLogger(StudentClassService.name);

  constructor(
      @InjectRepository(StudentClass)
      private classRepository: Repository<StudentClass>,
      private graphApiService: GraphApiService,
      private userAccessService: UserAccessService,
  ) {}
  create(createStudentClassDto: CreateStudentClassDto) {
    return this.classRepository.save(createStudentClassDto);
  }

  findAll() {
    return this.classRepository.find();
  }

  findOne(id: number) {
    return this.classRepository.findOne({where: {id: id}});
  }

  update(id: number, updateStudentClassDto: UpdateStudentClassDto) {
    return this.classRepository.update(id, updateStudentClassDto);
  }

  remove(id: number) {
    return this.classRepository.delete(id);
  }

  async createClasses() {
    let message = {message: ``, status: 500};
    const token = await this.userAccessService.getAccessToken();
    await this.graphApiService.getClasses(token).then(async (studentClass: any[]) => {
      let count = 0;
      for (const classes of studentClass) {
        if (classes?.groupTypes.length == 0 && classes?.onPremisesDomainName === "hftm.ch" && classes?.mail !== null) {

          if(classes?.displayName === "Geschäftsleitung" || classes?.displayName === "Dozierende" || classes?.displayName === "BBDA18.3a"){
            console.log(classes)
          }
          const currentClass = await this.classRepository.findOne({
            where: {oid: classes.id},
          });
          if (currentClass === null) {
            const classEntity = new StudentClass();
            classEntity.oid = classes.id;
            classEntity.name = classes.displayName;
            await this.create(classEntity);
            count++;
           }
        }
      }
      message = { message: `${count} Classes created`, status: 200 };
      this.logger.log(`${count} Classes created`);
    }).catch((error) => {
          this.logger.error(error);
          message = { message: `Unauthorized`, status: 401 };
        });
    return message;
  }
}

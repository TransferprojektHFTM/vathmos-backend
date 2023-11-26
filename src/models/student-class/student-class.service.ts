import {Injectable, OnModuleInit} from '@nestjs/common';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {GraphApiService} from "../../providers/graph-api.service";
import {UserAccessService} from "../../providers/user-access.service";
import {StudentClass} from "./entities/student-class.entity";
import {AppCustomLogger} from "../../app.custom.logger";
import { WebUntisAnonymousAuth } from 'webuntis';
import {Person} from "../person/entities/person.entity";

@Injectable()
export class StudentClassService {
  private readonly logger = new AppCustomLogger(StudentClassService.name);
  private untis = new WebUntisAnonymousAuth('hftm', 'mese.webuntis.com')
  private webUntisClasses = []
  constructor(
      @InjectRepository(StudentClass)
      private classRepository: Repository<StudentClass>,
      private graphApiService: GraphApiService,
      private userAccessService: UserAccessService,
  ) {

  }
  create(createStudentClassDto: CreateStudentClassDto) {
    return this.classRepository.save(createStudentClassDto);
  }

  findAll() {
    return this.classRepository.find({relations: ['persons','cohort']});
  }

  findOne(id: number) {
    return this.classRepository.findOne({where: {id: id},relations: ['persons', 'cohort']});
  }

  update(id: number, updateStudentClassDto: UpdateStudentClassDto) {
    return this.classRepository.update(id, updateStudentClassDto);
  }

  async createClasses() {
    let message = {message: ``, status: 500};
    const token = await this.userAccessService.getAccessToken();
    const  webUntisClasses = await this.getCurrentWebUntisClasses()
    this.logger.log(`Current count of webuntis classes  ${webUntisClasses.length}`)
    await this.graphApiService.getClasses(token).then(async (studentClasses: any[]) => {
      let count = 0;
      for (const studentClass of studentClasses) {
        if (this.compareObjectsInArray(webUntisClasses, studentClass)) {
          const currentClass = await this.classRepository.findOne({
            where: {oid: studentClass.id},
          });
          if (currentClass === null) {
            const classEntity = new StudentClass();
            classEntity.oid = studentClass.id;
            classEntity.name = studentClass.displayName;
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

  private compareObjectsInArray(array1, object2) {
    for (let i = 0; i < array1.length; i++) {
      const currentObject = array1[i];
      if (currentObject.name && object2.displayName) {
        if (currentObject.name === object2.displayName) {
          return true; // Return true if any object matches the condition
        }
      }
    }
    return false; // Return false if no match is found
  }

  private async getCurrentWebUntisClasses(){
    await this.untis.login()
    const schoolYear = await this.untis.getSchoolyears()
    return await this.untis.getClasses(true, schoolYear[0].id)
  }
}

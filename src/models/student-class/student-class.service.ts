import {Injectable} from '@nestjs/common';
import {CreateStudentClassDto} from './dto/create-student-class.dto';
import {UpdateStudentClassDto} from './dto/update-student-class.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Like, Repository} from 'typeorm';
import {GraphApiService} from '../../providers/graph-api.service';
import {UserAccessService} from '../../providers/user-access.service';
import {StudentClass} from './entities/student-class.entity';
import {AppCustomLogger} from '../../app.custom.logger';
import {WebUntisAnonymousAuth} from 'webuntis';
import {PersonService} from '../person/person.service';
import {ClientAccessService} from "../../providers/client-access.service";
import {Person} from "../person/entities/person.entity";

@Injectable()
export class StudentClassService {
  private readonly logger = new AppCustomLogger(StudentClassService.name);
  private untis = new WebUntisAnonymousAuth('hftm', 'mese.webuntis.com');

  constructor(
    @InjectRepository(StudentClass)
    private classRepository: Repository<StudentClass>,
    private graphApiService: GraphApiService,
    private userAccessService: UserAccessService,
    private clientAccessService: ClientAccessService,
    private personService: PersonService,
  ) {}

  create(createStudentClassDto: CreateStudentClassDto) {
    return this.classRepository.save(createStudentClassDto);
  }

  findAll(className: string = '') {
    if(className.length < 2) return this.classRepository.find({ relations: ['cohort'] });
    return this.classRepository.find({ where:{
        name: Like(`%${className}%`)
      },relations: ['persons', 'cohort'] });
  }

  findOne(id: number) {
    return this.classRepository.findOne({
      where: { id: id },
      relations: ['persons', 'cohort'],
    });
  }

  async update(id: number, updateStudentClassDto: UpdateStudentClassDto) {
    const studentClass = await this.classRepository.findOne({where: {id: id},  relations: ['persons', 'cohort']});
    studentClass.cohort = updateStudentClassDto.cohort;
    studentClass.persons = updateStudentClassDto.persons;
    return this.classRepository.save(studentClass);

  }

  async createClasses() {
    let message = { message: ``, status: 500 };
    const token = await this.userAccessService.getAccessToken();
    const webUntisClasses = await this.getCurrentWebUntisClasses();
    this.logger.log(
      `Current count of webuntis classes  ${webUntisClasses.length}`,
    );
    await this.graphApiService
      .getClasses(token)
      .then(async (studentClasses: any[]) => {
        let count = 0;
        for (const studentClass of studentClasses) {
          if (this.compareObjectsInArray(webUntisClasses, studentClass)) {
            const currentClass = await this.classRepository.findOne({
              where: { oid: studentClass.id },
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
      })
      .catch((error) => {
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

  private async getCurrentWebUntisClasses() {
    await this.untis.login();
    const schoolYear = await this.untis.getSchoolyears();
    return await this.untis.getClasses(true, schoolYear[0].id);
  }

  public async appRolesAzureAssignments(appRole: string = 'Student') {
    const studentClasses = await this.findAll();

    const appRoleId = '77ca2e45-398c-402e-bd63-c8d0ae2aa51e';
    //@TODO get appRoleId from database by name to make it dynamic with appRoleId

    const token = await this.clientAccessService.getAccessToken();
    const currentAssignment =
      await this.graphApiService.getCurrentAppRoleAssignments(token);
    const filteredClasses = this.filterObjectsByProperty(
      studentClasses,
      currentAssignment,
    );

    for (const studentClass of filteredClasses) {
      await this.graphApiService.addedUserOrGroupToVathmosApp(
        token,
        studentClass,
        appRoleId,
      );
    }
  }

  public async assignClassesToPersons() {
    const persons = await this.personService.findAll();
    const studentClasses = await this.findAll();
    const token = await this.userAccessService.getAccessToken();

    for (const studentClass of studentClasses) {
      const members = await this.graphApiService.getGroupMembers(
        token,
        studentClass,
      );
      studentClass.persons = [];
      for (const member of members) {

        const matchingPerson = persons.find(
          (person) => member['id'] === person['oid'],
        );
        if (matchingPerson) {
          studentClass.persons.push(matchingPerson);
        }
      }
      await this.update(studentClass.id, studentClass);
    }
  }

  private filterObjectsByProperty(
    studentClasses: StudentClass[],
    currentAssignment: [],
  ): StudentClass[] {
    const filteredObjects: StudentClass[] = [];

    for (const objectStudent of studentClasses) {
      const matchingObject = currentAssignment.find(
        (objectAssignment) =>
          objectStudent['oid'] === objectAssignment['principalId'],
      );

      if (!matchingObject) {
        filteredObjects.push(objectStudent);
      }
    }

    return filteredObjects;
  }
}

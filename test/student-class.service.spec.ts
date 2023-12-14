import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { StudentClassService } from '../src/models/student-class/student-class.service';
import { PersonService } from '../src/models/person/person.service';

describe('StudentClassService', () => {
  let app: INestApplication;
  let studentClassService: StudentClassService;
  let personService: PersonService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    studentClassService =
      moduleFixture.get<StudentClassService>(StudentClassService);
    personService = moduleFixture.get<PersonService>(PersonService);

    const persons = await personService.findAll();
    if (persons.length == 0) {
      const result = await personService.createPersons();
      expect(result.status).toBe(200);
    }

    const classes = await studentClassService.findAll();
    if (classes.length == 0) {
      const result = await studentClassService.createClasses();
      expect(result.status).toBe(200);
    }

    await app.init();
  }, 50000);

  it('Services should be defined', () => {
    expect(studentClassService).toBeDefined();
    expect(personService).toBeDefined();
  }, 10000);

  it('should assign classes to persons', async () => {
    await studentClassService.assignClassesToPersons();

    const updatedStudentClasses = await studentClassService.findAll();

    expect(updatedStudentClasses.length).toBeGreaterThan(0);
  }, 50000);
});

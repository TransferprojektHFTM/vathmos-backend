import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { TestDatabaseModule } from '../../config/database/mysql/test-database-module';
import { PersonModule } from './person.module';
import { log } from 'winston';
import { mockCreatePerson } from './mockTests/mock.create';
import { Person } from './entities/person.entity';

describe('PersonController', () => {
  let personService: PersonService;
  let personController: PersonController;

  const OID = '99999999-9999-9999-9999-999999999999';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseModule, PersonModule],
    }).compile();
    personService = module.get<PersonService>(PersonService);
    personController = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(personController).toBeDefined();
    expect(personService).toBeDefined();
  });

  describe('createAllPersons', () => {
    it('should create all persons', async () => {
      const result = await personController.createPersons();
      expect(result.status).toBe(200);
    }, 120000); // should be this long, empty db takes longer
  });

  describe('findPersonWithOid', () => {
    it('should get person with oid', async () => {
      const result = await personController.findOne(
        'b53c1e2b-5496-432e-a1c8-cd0fd4cd687d',
      );
      expect(result.oid).toBe('b53c1e2b-5496-432e-a1c8-cd0fd4cd687d');
      expect(result.email).toBe('vathmos.kursadmin@hftm.ch');
    });
  });

  describe('createPersonAndDeleteFromController', () => {
    let createPerson: Person;
    it('should create test person', async () => {
      createPerson = await personService.create(mockCreatePerson);
      expect(createPerson.oid).toBe(OID);
    });

    it('should delete created test person', async () => {
      const result = await personController.remove(createPerson.id.toString());
      expect(result.status).toBe(200);
    });
  });
});

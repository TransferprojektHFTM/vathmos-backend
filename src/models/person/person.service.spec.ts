import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { mockCreatePerson } from './mockTests/mock.create';
import { NotFoundException } from '@nestjs/common';
import { TestDatabaseModule } from '../../config/database/mysql/test-database-module';
import { PersonModule } from './person.module';

describe('PersonService', () => {
  let personService: PersonService;

  const OID = '99999999-9999-9999-9999-999999999999';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestDatabaseModule, PersonModule],
    }).compile();
    personService = module.get<PersonService>(PersonService);
  });

  it('personService should be defined', () => {
    expect(personService).toBeDefined();
  });


  describe('create', () => {
    it('should create a person', async () => {
      const result = await personService.create(mockCreatePerson);
      expect(result.oid).toBe(OID);
    });
  });

  describe('findCreatedUserWithOid', () => {
    it('should return true if user already exists', async () => {
      try {
        const result = await personService.findOne(OID);
        expect(result.oid).toBe(OID);
      } catch (e) {
        console.log('User not found');
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove a test Person', async () => {
      const findTestUser = await personService.findOne(OID);
      const result = await personService.remove(findTestUser.id);
      expect(result.status).toBe(200);
    });
  });

  describe('checkIsTestUserDeleted', () => {
    it('should return false if user does not exists', async () => {
      try {
        await personService.findOne(OID);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findAll', () => {
    it('should return count of users', async () => {
      const result = await personService.findAll();
      expect(result.length).toBeGreaterThan(3000);
    });
  });
});

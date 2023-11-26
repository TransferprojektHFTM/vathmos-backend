import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePersonDto } from './dto/update-person.dto';
import { AppCustomLogger } from '../../app.custom.logger';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { GraphApiService } from '../../providers/graph-api.service';
import { AzureAdPersonDto } from './dto/azure-ad-person.dto';
import { UserAccessService } from '../../providers/user-access.service';
import {Role} from "../role/entities/role.entity";

@Injectable()
export class PersonService {
  private readonly logger = new AppCustomLogger(PersonService.name);

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private graphApiService: GraphApiService,
    private userAccessService: UserAccessService,
  ) {}
  async create(person: Person) {
    return await this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  async findOne(oid: string) {
    const entity = await this.personRepository.findOne({ where: { oid: oid } });
    if (!entity) {
      this.logger.warn(`Person with id ${oid} not found`);
      throw new NotFoundException(`Entity with id ${oid} not found`);
    }
    return entity;
  }

  update(oid: string, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${oid} person`;
  }

  async remove(id: number): Promise<{ message: string; status: number }> {
    const deleteResult = await this.personRepository.delete(id);
    if (deleteResult.affected === 1) {
      this.logger.log(`Person with id ${id} deleted`);
      return { message: `Person with id ${id} deleted`, status: 200 };
    } else {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
  }

  async createPersons(): Promise<{ message: string; status: number }> {
    let message = { message: ``, status: 500 };
    const token = await this.userAccessService.getAccessToken();
    await this.graphApiService
      .getUserList(token)
      .then(async (persons: AzureAdPersonDto[]) => {
        let count = 0;
        for (const person of persons) {
          const currentPerson = await this.personRepository.findOne({
            where: { oid: person.id },
          });

         // if(person.userPrincipalName === 'vathmos.kursadmin@hftm.ch'){
         //   console.log(person)
         // }


          if (currentPerson === null && person.givenName && person.surname || currentPerson === null && person.userPrincipalName.includes('vathmos')) {
            const newPerson = new Person();
            newPerson.email = this.getUserEmail(person);
            newPerson.firstName = person.givenName;
            newPerson.surname = person.surname;
            newPerson.roles = [];
            newPerson.oid = person.id;
            newPerson.lastLogin = new Date('2000-01-01');
            await this.create(newPerson);
            count++;
          }
        }
        message = { message: `${count} Persons created`, status: 200 };
        this.logger.log(`${count} Persons created`);
      })
      .catch((error) => {
        this.logger.error(error);
        message = { message: `Unauthorized`, status: 401 };
      });
    return message;
  }

  private getUserEmail(person: AzureAdPersonDto): string {
    return person.email ? person.email : person.userPrincipalName;
  }

}

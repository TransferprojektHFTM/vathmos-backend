import {Injectable, NotFoundException} from '@nestjs/common';
import {UpdatePersonDto} from './dto/update-person.dto';
import {AppCustomLogger} from '../../app.custom.logger';
import {InjectRepository} from '@nestjs/typeorm';
import {Person} from './entities/person.entity';
import {Repository} from 'typeorm';
import {GraphApiService} from '../../providers/graph-api.service';
import {AzureAdPersonDto} from './dto/azure-ad-person.dto';
import {UserAccessService} from '../../providers/user-access.service';
import {RoleService} from "../role/role.service";

@Injectable()
export class PersonService {
  private readonly logger = new AppCustomLogger(PersonService.name);

  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    private roleService: RoleService,
    private graphApiService: GraphApiService,
    private userAccessService: UserAccessService,
  ) {}
  async create(person: Person) {
    return await this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({relations: ['roles','classes']});
  }

  async findOne(oid: string) {
    const entity = await this.personRepository.findOne({ where: { oid: oid }, relations: ['roles','classes'] });
    if (!entity) {
      this.logger.warn(`Person with id ${oid} not found`);
      throw new NotFoundException(`Entity with id ${oid} not found`);
    }
    return entity;
  }

  //@TODO update person
  update(id: number, updatePersonDto: UpdatePersonDto) {
    //return this.personRepository.update(id, updatePersonDto);
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
    const student = await this.roleService.findByName('Student');
    const teacher = await this.roleService.findByName('Dozent');
    await this.graphApiService
      .getUserList(token)
      .then(async (persons: AzureAdPersonDto[]) => {
        let count = 0;
        for (const person of persons) {
          const currentPerson = await this.personRepository.findOne({
            where: { oid: person.id },
          });

          if (currentPerson === null && person.givenName && person.surname || currentPerson === null && person.userPrincipalName.includes('vathmos')) {
            const newPerson = new Person();
            newPerson.email = this.getUserEmail(person);
            newPerson.firstName = person.givenName;
            newPerson.surname = person.surname;
            if(person.jobTitle === 'Mitarbeiter') {
              newPerson.roles = [teacher];
            }else{
              newPerson.roles = [student];
            }
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

  async getAllUserPicturesAndSave(): Promise<void> {
    const token = await this.userAccessService.getAccessToken();
    this.personRepository.find().then(async (persons: Person[]) => {
      for (const person of persons) {
        const image = await this.graphApiService.getUserPicture(token, person)
        if(image) {
          // person.picture = 'data:image/jpeg;base64,' + new Buffer.from(image, 'binary').toString('base64');
          person.picture = image
          await this.personRepository.update(person.id, person);
        }
      }
    });
  }
}

import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';
import {AppCustomLogger} from "../../app.custom.logger";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {Cohort} from "./entities/cohort.entity";

@Injectable()
export class CohortService {
  private readonly logger = new AppCustomLogger(CohortService.name);

  constructor(
      @InjectRepository(Cohort)
      private cohortRepository: Repository<Cohort>,) {
  }

  async create(createCohortDto: CreateCohortDto) {
      await this.cohortRepository.save(createCohortDto);
  }

  async findAll() {
    return await this.cohortRepository.find({relations: ['studentClasses', 'degreeProgram']});
  }

  async findOne(id: number) {
    const entity = await this.cohortRepository.findOne({
      where: {id: id},
      relations: ['studentClasses', 'degreeProgram']
    });
    if (!entity) {
      this.logger.warn(`Cohort with id ${id} not found`);
      throw new NotFoundException(`Cohort with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateCohortDto: UpdateCohortDto) {
    const cohort = await this.cohortRepository.findOneBy({id});
    Object.assign(cohort, updateCohortDto);
    const result =  await this.cohortRepository.save(cohort);

    if(result){
      this.logger.log(`Cohort with id ${id} updated`);
    }else {
        throw new NotFoundException(`Cohort with id ${id} not found`);
    }
  }

  async remove(id: number) {
    let deleteResult: DeleteResult;
    try {
      deleteResult = await this.cohortRepository.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw  new NotAcceptableException(`Cannot delete row because of foreign key constraint to student_class`)
    }
    if (deleteResult.affected === 1) {
      this.logger.log(`Cohort with id ${id} deleted`);
      return {message: `Cohort with id ${id} deleted`, status: 200};
    } else {
      throw new NotFoundException(`Cohort with id ${id} not found`);
    }
  }
}

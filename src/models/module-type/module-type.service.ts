import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateModuleTypeDto } from './dto/create-module-type.dto';
import { UpdateModuleTypeDto } from './dto/update-module-type.dto';
import {AppCustomLogger} from "../../app.custom.logger";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ModuleType} from "./entities/module-type.entity";

@Injectable()
export class ModuleTypeService {
  private readonly logger = new AppCustomLogger(ModuleTypeService.name);


  constructor(
      @InjectRepository(ModuleType)
      private modulTypeRepository: Repository<ModuleType>
  ) {}

  async create(createModuleTypeDto: CreateModuleTypeDto) {
    return await this.modulTypeRepository.save(createModuleTypeDto);
  }

  async findAll() {
    return await this.modulTypeRepository.find();
  }

  async findOne(id: number) {
    const entity = await this.modulTypeRepository.findOne({where: {id: id}});
    console.log(entity)
    if (!entity) {
      this.logger.warn(`Modul-Type with id ${id} not found`);
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateModuleTypeDto: UpdateModuleTypeDto) {
    const updateResult = await this.modulTypeRepository.update(id, updateModuleTypeDto);
    if(updateResult.affected === 1) {
      this.logger.log(`Modul-Type with id ${id} updated`);
      return this.findOne(id);
    } else{
      throw new NotFoundException(`Modul-Type with id ${id} not found`);
    }
  }

  async remove(id: number): Promise<{ message: string; status: number }>  {
    const deleteResult = await this.modulTypeRepository.delete(id);
    if (deleteResult.affected === 1) {
      this.logger.log(`ModulType with id ${id} deleted`);
      return {message: `ModulType with id ${id} deleted`, status: 200};
    } else {
      throw new NotFoundException(`ModulType with id ${id} not found`);
    }
  }
}

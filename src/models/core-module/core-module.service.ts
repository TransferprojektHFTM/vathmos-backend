import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { CreateCoreModuleDto } from './dto/create-core-module.dto';
import { UpdateCoreModuleDto } from './dto/update-core-module.dto';
import { AppCustomLogger } from '../../app.custom.logger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreModule } from './entities/core-module.entity';

@Injectable()
export class CoreModuleService {
  private readonly logger = new AppCustomLogger(CoreModuleService.name);

  constructor(
    @InjectRepository(CoreModule)
    private coreModulRepository: Repository<CoreModule>,
  ) {}
  async create(createCoreModuleDto: CreateCoreModuleDto) {
    try {
      return await this.coreModulRepository.save(createCoreModuleDto);
    }catch (e) {
      throw new NotAcceptableException(`Cannot add or update a child row moduleType id ${createCoreModuleDto.moduleType.id} does not exist`)
    }
  }

  async findAll() {
      return await this.coreModulRepository.find({relations: ["moduleType"]});
  }

  async findOne(id: number) {
    const entity = await this.coreModulRepository.find({where: {id: id}, relations: ["moduleType"]});
    if (!entity.length) {
      this.logger.warn(`Core Module with id ${id} not found`);
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  async update(id: number, updateCoreModuleDto: UpdateCoreModuleDto) {
    try {
      const updateResult = await this.coreModulRepository.update(id, updateCoreModuleDto);
      if(updateResult.affected === 1) {
        this.logger.log(`Core Module with id ${id} updated`);
        return this.findOne(id);
      } else{
        throw new NotFoundException(`Core Module with id ${id} not found`);
      }
    }catch (e) {
      throw new NotAcceptableException(`Cannot add or update a child row moduleType id ${updateCoreModuleDto.moduleType.id} does not exist`)
    }
  }

  async remove(id: number) {
    const deleteResult = await this.coreModulRepository.delete(id);
    if (deleteResult.affected === 1) {
      this.logger.log(`Core Module with id ${id} deleted`);
      return {message: `ModulType with id ${id} deleted`, status: 200};
    } else {
      throw new NotFoundException(`Core Module with id ${id} not found`);
    }
  }
}

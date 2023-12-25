import { Injectable } from '@nestjs/common';
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
  create(createCoreModuleDto: CreateCoreModuleDto) {
    return 'This action adds a new coreModule';
  }

  findAll() {
    return this.coreModulRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} coreModule`;
  }

  update(id: number, updateCoreModuleDto: UpdateCoreModuleDto) {
    return `This action updates a #${id} coreModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} coreModule`;
  }
}

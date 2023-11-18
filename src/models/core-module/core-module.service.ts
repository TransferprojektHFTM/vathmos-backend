import { Injectable } from '@nestjs/common';
import { CreateCoreModuleDto } from './dto/create-core-module.dto';
import { UpdateCoreModuleDto } from './dto/update-core-module.dto';

@Injectable()
export class CoreModuleService {
  create(createCoreModuleDto: CreateCoreModuleDto) {
    return 'This action adds a new coreModule';
  }

  findAll() {
    return `This action returns all coreModule`;
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

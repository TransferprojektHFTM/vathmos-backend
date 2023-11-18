import { Injectable } from '@nestjs/common';
import { CreateModuleTypeDto } from './dto/create-module-type.dto';
import { UpdateModuleTypeDto } from './dto/update-module-type.dto';

@Injectable()
export class ModuleTypeService {
  create(createModuleTypeDto: CreateModuleTypeDto) {
    return 'This action adds a new moduleType';
  }

  findAll() {
    return `This action returns all moduleType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moduleType`;
  }

  update(id: number, updateModuleTypeDto: UpdateModuleTypeDto) {
    return `This action updates a #${id} moduleType`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduleType`;
  }
}

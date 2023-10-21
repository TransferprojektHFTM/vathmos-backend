import { Injectable } from '@nestjs/common';
import { CreateHftmModulePartDto } from './dto/create-hftm-module-part.dto';
import { UpdateHftmModulePartDto } from './dto/update-hftm-module-part.dto';

@Injectable()
export class HftmModulePartService {
  create(createHftmModulePartDto: CreateHftmModulePartDto) {
    return 'This action adds a new hftmModulePart';
  }

  findAll() {
    return `This action returns all hftmModulePart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hftmModulePart`;
  }

  update(id: number, updateHftmModulePartDto: UpdateHftmModulePartDto) {
    return `This action updates a #${id} hftmModulePart`;
  }

  remove(id: number) {
    return `This action removes a #${id} hftmModulePart`;
  }
}

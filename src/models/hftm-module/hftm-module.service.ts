import { Injectable } from '@nestjs/common';
import { CreateHftmModuleDto } from './dto/create-hftm-module.dto';
import { UpdateHftmModuleDto } from './dto/update-hftm-module.dto';

@Injectable()
export class HftmModuleService {
  create(createHftmModuleDto: CreateHftmModuleDto) {
    return 'This action adds a new hftmModule';
  }

  findAll() {
    return `This action returns all hftmModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hftmModule`;
  }

  update(id: number, updateHftmModuleDto: UpdateHftmModuleDto) {
    return `This action updates a #${id} hftmModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} hftmModule`;
  }
}

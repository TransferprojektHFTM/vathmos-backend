import { Injectable } from '@nestjs/common';
import { CreateModulePlanDto } from './dto/create-module-plan.dto';
import { UpdateModulePlanDto } from './dto/update-module-plan.dto';

@Injectable()
export class ModulePlanService {
  create(createModulePlanDto: CreateModulePlanDto) {
    return 'This action adds a new modulePlan';
  }

  findAll() {
    return `This action returns all modulePlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modulePlan`;
  }

  update(id: number, updateModulePlanDto: UpdateModulePlanDto) {
    return `This action updates a #${id} modulePlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} modulePlan`;
  }
}

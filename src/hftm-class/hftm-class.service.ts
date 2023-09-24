import { Injectable } from '@nestjs/common';
import { CreateHftmClassDto } from './dto/create-hftm-class.dto';
import { UpdateHftmClassDto } from './dto/update-hftm-class.dto';

@Injectable()
export class HftmClassService {
  create(createHftmClassDto: CreateHftmClassDto) {
    return 'This action adds a new hftmClass';
  }

  findAll() {
    return `This action returns all hftmClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hftmClass`;
  }

  update(id: number, updateHftmClassDto: UpdateHftmClassDto) {
    return `This action updates a #${id} hftmClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} hftmClass`;
  }
}

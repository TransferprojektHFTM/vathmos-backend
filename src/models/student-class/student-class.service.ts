import { Injectable } from '@nestjs/common';
import { CreateHftmClassDto } from './dto/create-student-class.dto';
import { UpdateHftmClassDto } from './dto/update-student-class.dto';

@Injectable()
export class HftmClassService {
  create(createHftmClassDto: CreateHftmClassDto) {
    return 'This action adds a new studentClass';
  }

  findAll() {
    return `This action returns all studentClass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentClass`;
  }

  update(id: number, updateHftmClassDto: UpdateHftmClassDto) {
    return `This action updates a #${id} studentClass`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentClass`;
  }
}

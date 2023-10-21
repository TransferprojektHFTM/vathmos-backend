import { Injectable } from '@nestjs/common';
import { CreateModulTypDto } from './dto/create-modul-typ.dto';
import { UpdateModulTypDto } from './dto/update-modul-typ.dto';

@Injectable()
export class ModulTypService {
  create(createModulTypDto: CreateModulTypDto) {
    return 'This action adds a new modulTyp';
  }

  findAll() {
    return `This action returns all modulTyp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} modulTyp`;
  }

  update(id: number, updateModulTypDto: UpdateModulTypDto) {
    return `This action updates a #${id} modulTyp`;
  }

  remove(id: number) {
    return `This action removes a #${id} modulTyp`;
  }
}

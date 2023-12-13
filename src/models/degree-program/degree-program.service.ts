import { Injectable } from '@nestjs/common';
import { CreateDegreeProgramDto } from './dto/create-degree-program.dto';
import { UpdateDegreeProgramDto } from './dto/update-degree-program.dto';

@Injectable()
export class DegreeProgramService {
  create(createDegreeProgramDto: CreateDegreeProgramDto) {
    return 'This action adds a new degree program';
  }

  findAll() {
    return `This action returns all degree program`;
  }

  findOne(id: number) {
    return `This action returns a #${id} degree program`;
  }

  update(id: number, updateDegreeProgramDto: UpdateDegreeProgramDto) {
    return `This action updates a #${id} degree program`;
  }

  remove(id: number) {
    return `This action removes a #${id} degree program`;
  }
}

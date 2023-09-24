import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HftmClassService } from './hftm-class.service';
import { CreateHftmClassDto } from './dto/create-hftm-class.dto';
import { UpdateHftmClassDto } from './dto/update-hftm-class.dto';

@Controller('hftm-class')
export class HftmClassController {
  constructor(private readonly hftmClassService: HftmClassService) {}

  @Post()
  create(@Body() createHftmClassDto: CreateHftmClassDto) {
    return this.hftmClassService.create(createHftmClassDto);
  }

  @Get()
  findAll() {
    return this.hftmClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hftmClassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHftmClassDto: UpdateHftmClassDto) {
    return this.hftmClassService.update(+id, updateHftmClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hftmClassService.remove(+id);
  }
}

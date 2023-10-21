import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HftmModuleService } from './hftm-module.service';
import { CreateHftmModuleDto } from './dto/create-hftm-module.dto';
import { UpdateHftmModuleDto } from './dto/update-hftm-module.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('hftm Module')
@ApiBearerAuth()
@Controller('hftm-module')
export class HftmModuleController {
  constructor(private readonly hftmModuleService: HftmModuleService) {}

  @Post()
  create(@Body() createHftmModuleDto: CreateHftmModuleDto) {
    return this.hftmModuleService.create(createHftmModuleDto);
  }

  @Get()
  findAll() {
    return this.hftmModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hftmModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHftmModuleDto: UpdateHftmModuleDto) {
    return this.hftmModuleService.update(+id, updateHftmModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hftmModuleService.remove(+id);
  }
}

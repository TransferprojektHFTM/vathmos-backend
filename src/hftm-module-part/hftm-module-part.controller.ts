import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HftmModulePartService } from './hftm-module-part.service';
import { CreateHftmModulePartDto } from './dto/create-hftm-module-part.dto';
import { UpdateHftmModulePartDto } from './dto/update-hftm-module-part.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('hftm Module Part')
@ApiBearerAuth()
@Controller('hftm-module-part')
export class HftmModulePartController {
  constructor(private readonly hftmModulePartService: HftmModulePartService) {}

  @Post()
  create(@Body() createHftmModulePartDto: CreateHftmModulePartDto) {
    return this.hftmModulePartService.create(createHftmModulePartDto);
  }

  @Get()
  findAll() {
    return this.hftmModulePartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hftmModulePartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHftmModulePartDto: UpdateHftmModulePartDto) {
    return this.hftmModulePartService.update(+id, updateHftmModulePartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hftmModulePartService.remove(+id);
  }
}

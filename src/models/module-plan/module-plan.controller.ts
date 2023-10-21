import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulePlanService } from './module-plan.service';
import { CreateModulePlanDto } from './dto/create-module-plan.dto';
import { UpdateModulePlanDto } from './dto/update-module-plan.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Module Plan')
@Controller('module-plan')
export class ModulePlanController {
  constructor(private readonly modulePlanService: ModulePlanService) {}

  @Post()
  create(@Body() createModulePlanDto: CreateModulePlanDto) {
    return this.modulePlanService.create(createModulePlanDto);
  }

  @Get()
  findAll() {
    return this.modulePlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulePlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModulePlanDto: UpdateModulePlanDto) {
    return this.modulePlanService.update(+id, updateModulePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulePlanService.remove(+id);
  }
}

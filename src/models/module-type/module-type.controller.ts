import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleTypeService } from './module-type.service';
import { CreateModuleTypeDto } from './dto/create-module-type.dto';
import { UpdateModuleTypeDto } from './dto/update-module-type.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Module Type')
@ApiBearerAuth()
@Controller('module-type')
export class ModuleTypeController {
  constructor(private readonly moduleTypeService: ModuleTypeService) {}

  @Post()
  create(@Body() createModuleTypeDto: CreateModuleTypeDto) {
    return this.moduleTypeService.create(createModuleTypeDto);
  }

  @Get()
  findAll() {
    return this.moduleTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleTypeDto: UpdateModuleTypeDto,
  ) {
    return this.moduleTypeService.update(+id, updateModuleTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleTypeService.remove(+id);
  }
}

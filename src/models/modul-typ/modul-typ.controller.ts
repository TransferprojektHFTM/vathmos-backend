import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModulTypService } from './modul-typ.service';
import { CreateModulTypDto } from './dto/create-modul-typ.dto';
import { UpdateModulTypDto } from './dto/update-modul-typ.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Modul Typ')
@ApiBearerAuth()
@Controller('modul-typ')
export class ModulTypController {
  constructor(private readonly modulTypService: ModulTypService) {}

  @Post()
  create(@Body() createModulTypDto: CreateModulTypDto) {
    return this.modulTypService.create(createModulTypDto);
  }

  @Get()
  findAll() {
    return this.modulTypService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulTypService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModulTypDto: UpdateModulTypDto,
  ) {
    return this.modulTypService.update(+id, updateModulTypDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulTypService.remove(+id);
  }
}

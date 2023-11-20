import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CoreModuleService } from './core-module.service';
import { CreateCoreModuleDto } from './dto/create-core-module.dto';
import { UpdateCoreModuleDto } from './dto/update-core-module.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Core module')
@ApiBearerAuth()
@Controller('core-module')
export class CoreModuleController {
  constructor(private readonly coreModuleService: CoreModuleService) {}

  @Post()
  create(@Body() createCoreModuleDto: CreateCoreModuleDto) {
    return this.coreModuleService.create(createCoreModuleDto);
  }

  @Get()
  findAll() {
    return this.coreModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coreModuleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoreModuleDto: UpdateCoreModuleDto,
  ) {
    return this.coreModuleService.update(+id, updateCoreModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coreModuleService.remove(+id);
  }
}

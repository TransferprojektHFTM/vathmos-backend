import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DegreeProgramService } from './degree-program.service';
import { CreateDegreeProgramDto } from './dto/create-degree-program.dto';
import { UpdateDegreeProgramDto } from './dto/update-degree-program.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('DegreeProgram')
@ApiBearerAuth()
@Controller('degree')
export class DegreeProgramController {
  constructor(private readonly degreeProgramService: DegreeProgramService) {}

  @Post()
  create(@Body() createDegreeProgramDto: CreateDegreeProgramDto) {
    return this.degreeProgramService.create(createDegreeProgramDto);
  }

  @Get()
  findAll() {
    return this.degreeProgramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.degreeProgramService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDegreeProgramDto: UpdateDegreeProgramDto,
  ) {
    return this.degreeProgramService.update(+id, updateDegreeProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.degreeProgramService.remove(+id);
  }
}

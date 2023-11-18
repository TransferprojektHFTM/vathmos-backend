import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HftmClassService } from './student-class.service';
import { CreateHftmClassDto } from './dto/create-student-class.dto';
import { UpdateHftmClassDto } from './dto/update-student-class.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('student class')
@ApiBearerAuth()
@Controller('student-class')
export class HftmClassController {
  constructor(private readonly studentClassService: HftmClassService) {}

  @Post()
  create(@Body() createHftmClassDto: CreateHftmClassDto) {
    return this.studentClassService.create(createHftmClassDto);
  }

  @Get()
  findAll() {
    return this.studentClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentClassService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHftmClassDto: UpdateHftmClassDto,
  ) {
    return this.studentClassService.update(+id, updateHftmClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentClassService.remove(+id);
  }
}

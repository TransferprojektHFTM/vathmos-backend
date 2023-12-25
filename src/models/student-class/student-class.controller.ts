import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { StudentClassService } from './student-class.service';
import { CreateStudentClassDto } from './dto/create-student-class.dto';
import { UpdateStudentClassDto } from './dto/update-student-class.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../auth-guard/vathmos-auth-guard';
import { GetPersonDto } from '../person/dto/get-person.dto';
import { GetClassesDto } from './dto/get-classes.dto';

@ApiTags('Student class')
@ApiBearerAuth()
@Controller('student-class')
export class StudentClassController {
  constructor(private readonly studentClassService: StudentClassService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a list of all classes' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetClassesDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'className',
    required: false,
    type: String,
    description: 'Find where class Name like "BBIN....."',
  })
  @Get()
  findAll(@Query('className') className: string = '') {
    return this.studentClassService.findAll(className);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get classes with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetClassesDto,
    isArray: true,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentClassService.findOne(+id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetClassesDto,
    isArray: true,
  })
  @ApiOperation({
    summary:
      'Append Dozent to class, only "KursAdmin" can use this route or assign to cohort',
  })
  @Roles('KursAdmin')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentClassDto: UpdateStudentClassDto,
  ) {
    return this.studentClassService.update(+id, updateStudentClassDto);
  }

  @ApiTags('Settings')
  @Post('createClasses')
  @ApiOperation({
    summary:
      'Create all classes into hftm, only "KursAdmin" can use this route',
  })
  @Roles('KursAdmin')
  createPersons() {
    return this.studentClassService.createClasses();
  }
}

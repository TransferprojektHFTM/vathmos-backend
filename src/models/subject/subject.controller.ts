import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpStatus,
} from '@nestjs/common';
import {SubjectService} from './subject.service';
import {CreateSubjectDto} from './dto/create-subject.dto';
import {UpdateSubjectDto} from './dto/update-subject.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from '../../auth-guard/vathmos-auth-guard';
import {Subject} from './entities/subject.entity';
import {GetSubjectDto} from './dto/get-subject.dto';

@ApiTags('Subject')
@Roles('Student', 'Dozent', 'KursAdmin')
@ApiBearerAuth()
@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {
    }

    @Post()
    @ApiOperation({ summary: 'Create a new subject' })
    @ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Created',
    })
    create(@Body() createSubjectDto: CreateSubjectDto) {
        return this.subjectService.create(createSubjectDto);
    }

    @Get()
    @ApiOperation({summary: 'Get a list of all subjects'})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Ok',
        type: GetSubjectDto,
        isArray: true,
    })
    findAll(): Promise<Subject[]> {
        return this.subjectService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get subject with id' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Ok',
      type: GetSubjectDto,
    })
    findOne(@Param('id') id: string) {
        return this.subjectService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update exam with id' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Ok',
    })
    update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
        return this.subjectService.update(+id, updateSubjectDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a subject with id' })
    remove(@Param('id') id: string) {
        return this.subjectService.remove(+id);
    }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Exam } from './entities/exam.entity';
import { Roles, VathmosAuthGuard } from '../../auth-guard/vathmos-auth-guard';
import { GetExamDto } from './dto/get-exam.dto';

@ApiTags('Exam')
@ApiBearerAuth()
@Roles('Student', 'Dozent', 'KursAdmin')
@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a list of all exams' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetExamDto,
    isArray: true,
  })
  findAll(): Promise<Exam[]> {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(+id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(+id);
  }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete, HttpStatus, UsePipes, ValidationPipe,
} from '@nestjs/common';
import {ExamService} from './exam.service';
import {CreateExamDto} from './dto/create-exam.dto';
import {UpdateExamDto} from './dto/update-exam.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Exam} from './entities/exam.entity';
import {Roles, VathmosAuthGuard} from '../../auth-guard/vathmos-auth-guard';
import {GetExamDto} from './dto/get-exam.dto';

@ApiTags('Exam')
@ApiBearerAuth()
@Controller('exam')
export class ExamController {
    constructor(
        private readonly examService: ExamService
    ) {}

    @Post()
    @ApiOperation({summary: 'Create a new exam'})
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Created',
        type: GetExamDto,
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Roles('Dozent', 'KursAdmin')
    create(@Body() createExamDto: CreateExamDto) {
        return this.examService.create(createExamDto);
    }

    @Get()
    @ApiOperation({summary: 'Get a list of all exams'})
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
    @ApiOperation({summary: 'Get exam with id'})
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Ok',
      type: GetExamDto,
    })
    findOne(@Param('id') id: string) {
        return this.examService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update exam with id'})
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Ok',
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Roles('Dozent', 'KursAdmin')
    update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
        return this.examService.update(+id, updateExamDto);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete a exam with id'})
    @Roles('Dozent', 'KursAdmin')
    remove(@Param('id') id: string) {
        return this.examService.remove(+id);
    }
}

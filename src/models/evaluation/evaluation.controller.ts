import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpCode, HttpStatus,
} from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from "../../auth-guard/vathmos-auth-guard";
import {GetEvaluationDto} from "./dto/get-evaluation.dto";
import {ErrorResponse} from "../../common/interfaces/errorResponse.interface";

@ApiTags('Evaluation')
@ApiBearerAuth()
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Evaluation (only Student, Dozent allowed)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Ok',
    type: GetEvaluationDto,
    isArray: false,
  })
  @Roles('Student', 'Dozent')
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a list of all Evaluation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetEvaluationDto,
    isArray: true,
  })
  findAll() {
    return this.evaluationService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Evaluation with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetEvaluationDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.evaluationService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Evaluation with id (only Student, Dozent allowed)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetEvaluationDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  @Roles('Student', 'Dozent')
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationService.update(+id, updateEvaluationDto);
  }

  //@TODO: Change Error Response Type to DeleteResponse from ModuleType Branch
  @Delete(':id')
  @ApiOperation({ summary: 'Delete Evaluation with id (only Student, Dozent allowed)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetEvaluationDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  @Roles('Student', 'Dozent')
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(+id);
  }
}

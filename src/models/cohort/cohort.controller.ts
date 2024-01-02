import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpCode, HttpStatus,
} from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { UpdateCohortDto } from './dto/update-cohort.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetCohortDto} from "./dto/get-cohort.dto";
import {Roles} from "../../auth-guard/vathmos-auth-guard";
import {ErrorResponse} from "../../common/interfaces/errorResponse.interface";

@ApiTags('Cohort')
@ApiBearerAuth()
@Controller('cohort')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Cohort only KursAdmin' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Ok',
    type: GetCohortDto,
    isArray: false,
  })
  @Roles('KursAdmin')
  create(@Body() createCohortDto: CreateCohortDto) {
    return this.cohortService.create(createCohortDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a list of all Cohorts' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetCohortDto,
    isArray: true,
  })
  findAll() {
    return this.cohortService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Cohort with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetCohortDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.cohortService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Cohort with id but only KursAdmin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetCohortDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  @Roles('KursAdmin')
  update(@Param('id') id: string, @Body() updateCohortDto: UpdateCohortDto) {
    return this.cohortService.update(+id, updateCohortDto);
  }

  //@TODO: Change Error Response Type to DeleteResponse from ModuleType Branch
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Cohort with id but only KursAdmin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: ErrorResponse,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  @Roles('KursAdmin')
  remove(@Param('id') id: string) {
    return this.cohortService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpCode, HttpStatus, ValidationPipe, UsePipes,
} from '@nestjs/common';
import { CoreModuleService } from './core-module.service';
import { CreateCoreModuleDto } from './dto/create-core-module.dto';
import { UpdateCoreModuleDto } from './dto/update-core-module.dto';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetCoreModuleDto} from "./dto/get-core-module.dto";
import {Roles} from "../../auth-guard/vathmos-auth-guard";
import {ErrorResponse} from "../../common/interfaces/errorResponse.interface";

@ApiTags('Core module')
@ApiBearerAuth()
@Controller('core-module')
export class CoreModuleController {
  constructor(private readonly coreModuleService: CoreModuleService) {}

  @Post()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Core Module only KursAdmin' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Ok',
    type: GetCoreModuleDto,
    isArray: false,
  })
  @Roles('KursAdmin')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createCoreModuleDto: CreateCoreModuleDto) {
    return this.coreModuleService.create(createCoreModuleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a list of all Core Modules' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetCoreModuleDto,
    isArray: true,
  })
  findAll() {
    return this.coreModuleService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Core Module with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetCoreModuleDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.coreModuleService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Core Module with id only KursAdmin' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetCoreModuleDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  @Roles('KursAdmin')
  update(
    @Param('id') id: string,
    @Body() updateCoreModuleDto: UpdateCoreModuleDto,
  ) {
    return this.coreModuleService.update(+id, updateCoreModuleDto);
  }

  //@TODO: Change Error Response Type to DeleteResponse from ModuleType Branch
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Core Module with id but only KursAdmin' })
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
    return this.coreModuleService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, HttpCode, HttpStatus, ValidationPipe, UsePipes,
} from '@nestjs/common';
import { ModuleTypeService } from './module-type.service';
import { CreateModuleTypeDto } from './dto/create-module-type.dto';
import { UpdateModuleTypeDto } from './dto/update-module-type.dto';
import {ApiBearerAuth, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {Roles} from "../../auth-guard/vathmos-auth-guard";
import {GetModuleTypeDto} from "./dto/get-module-type.dto";
import {ErrorResponse} from "../../common/interfaces/errorResponse.interface";
import {DeleteResponse} from "../../common/interfaces/deleteResponse.interface";

@ApiTags('Module Type')
@ApiBearerAuth()
@Controller('module-type')
export class ModuleTypeController {
  constructor(private readonly moduleTypeService: ModuleTypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new Modultype only KursAdmin' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Ok',
    type: GetModuleTypeDto,
    isArray: false,
  })
  @Roles('KursAdmin')
  @ApiExcludeEndpoint()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createModuleTypeDto: CreateModuleTypeDto) {
    return this.moduleTypeService.create(createModuleTypeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all Modultype`s' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetModuleTypeDto,
    isArray: true,
  })
  findAll() {
    return this.moduleTypeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Modultype with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetModuleTypeDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.moduleTypeService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update Modultype with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetModuleTypeDto,
    isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  @Roles('KursAdmin')
  @ApiExcludeEndpoint()
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: string,
    @Body() updateModuleTypeDto: UpdateModuleTypeDto,
  ) {
    return this.moduleTypeService.update(+id, updateModuleTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Modultype with id' })
  @ApiResponse({
     status: HttpStatus.OK,
     description: 'Ok',
     type: DeleteResponse,
     isArray: false,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
    type: ErrorResponse,
    isArray: false,
  })
  @Roles('KursAdmin')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.moduleTypeService.remove(+id);
  }
}

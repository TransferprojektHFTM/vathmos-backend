import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {GetPersonDto} from "../person/dto/get-person.dto";
import {Role} from "./entities/role.entity";
import {Roles} from "../../auth-guard/vathmos-auth-guard";

@ApiTags('Role')
@Roles('KursAdmin')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create a new Role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: CreateRoleDto,
    isArray: false,
  })
  @ApiExcludeEndpoint()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: Role,
    isArray: true,
  })
  @ApiQuery({
    name: 'roleName',
    required: false,
    type: String,
    description: 'Find role with name',
  })
  findAll(@Query('roleName') roleName: string = '') {
    return this.roleService.findAll(roleName);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a role with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: Role,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: Role,
    isArray: false,
  })
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete role with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
  })
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}

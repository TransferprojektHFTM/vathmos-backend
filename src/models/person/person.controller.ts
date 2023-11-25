import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { UpdatePersonDto } from './dto/update-person.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../auth-guard/vathmos-auth-guard';
import { GetPersonDto } from './dto/get-person.dto';

@ApiTags('Person')
@ApiBearerAuth()
@Roles('Student', 'Dozent', 'KursAdmin')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a list of all persons' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetPersonDto,
    isArray: true,
  })
  findAll() {
    return this.personService.findAll();
  }

  @Get(':oid')
  @ApiOperation({ summary: 'Get person with oid' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
    type: GetPersonDto,
    isArray: true,
  })
  findOne(@Param('oid') oid: string) {
    return this.personService.findOne(oid);
  }

  @Patch(':oid')
  update(@Param('oid') oid: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(oid, updatePersonDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a person with id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Ok',
  })
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }

  @ApiTags('Settings')
  @Post('createPerson')
  @ApiOperation({
    summary:
      'Create all persons into hftm, only "KursAdmin" can use this route',
  })
  @Roles('KursAdmin')
  @UsePipes(new ValidationPipe({ transform: true }))
  createPersons() {
    return this.personService.createPersons();
  }
}

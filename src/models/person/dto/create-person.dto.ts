import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {Role} from "../../role/entities/role.entity";

export class CreatePersonDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Max' })
  public firstName: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Mustermann' })
  public surname: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'max.mustermann@hftm.ch' })
  public mail: string;

  @ApiProperty({ example: 'data:image/png;base64,iVBORw0KGgoA........' })
  public picture: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Student' })
  public roles: string[];
}

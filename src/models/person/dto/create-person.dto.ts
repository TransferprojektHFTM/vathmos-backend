import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {Role} from "../../role/entities/role.entity";
import {NoScriptTags} from "../../../common/validators/noScriptTags.validator";

export class CreatePersonDto {
  @IsNotEmpty()
  @NoScriptTags()
  @ApiProperty({ example: 'Max' })
  public firstName: string;

  @IsNotEmpty()
  @NoScriptTags()
  @ApiProperty({ example: 'Mustermann' })
  public surname: string;

  @IsNotEmpty()
  @NoScriptTags()
  @ApiProperty({ example: 'max.mustermann@hftm.ch' })
  public mail: string;

  @NoScriptTags()
  @ApiProperty({ example: 'data:image/png;base64,iVBORw0KGgoA........' })
  public picture: string;

  @IsNotEmpty()
  @ApiProperty({ example: Role.name })
  public roles: Role[];
}

import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoScriptTags } from '../../../common/validators/noScriptTags.validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @NoScriptTags()
  @ApiProperty({ example: 'Student' })
  name: string;
  @IsNotEmpty()
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  appRoleId: string;
}

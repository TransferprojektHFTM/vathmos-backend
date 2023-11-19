import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetPersonDto {
  @ApiProperty({ example: '256' })
  @IsNotEmpty()
  public id: number;

  @ApiProperty({ example: 'dcd60435-dfff-4c73-b8aa-1e68d56fd1c6' })
  @IsNotEmpty()
  public oid: string;

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

  @ApiProperty({ example: '2021-05-04T08:54:00.000Z' })
  public lastLogin: Date;

  @ApiProperty({ example: true })
  public isActivated: boolean;
}

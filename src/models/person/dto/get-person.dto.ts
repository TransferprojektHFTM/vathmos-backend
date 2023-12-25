import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {Role} from "../../role/entities/role.entity";
import {StudentClass} from "../../student-class/entities/student-class.entity";

export class GetPersonDto {
  @ApiProperty({ example: '256' })
  public id: number;

  @ApiProperty({ example: 'dcd60435-dfff-4c73-b8aa-1e68d56fd1c6' })
  public oid: string;

  @ApiProperty({ example: 'Max' })
  public firstName: string;

  @ApiProperty({ example: 'Mustermann' })
  public surname: string;

  @ApiProperty({ example: 'max.mustermann@hftm.ch' })
  public mail: string;

  @ApiProperty({ example: 'data:image/png;base64,iVBORw0KGgoA........' })
  public picture: string;

  @ApiProperty({ example: '2021-05-04T08:54:00.000Z' })
  public lastLogin: Date;

  @ApiProperty({ example: true })
  public isActivated: boolean;

  @ApiProperty({ example: [{
    id: 1,
    appRoleId: '00000000-0000-0000-0000-000000000000',
    name: 'Student',
    }]})
  public roles: Role[];

    @ApiProperty({ example: [
        {
          "id": 71,
          "name": "BBMB21.2b",
          "oid": "00000000-0000-0000-0000-000000000000"
        }]}
    )
  public classes: StudentClass[];
}

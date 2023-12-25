import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { Person } from '../../person/entities/person.entity';
import { Cohort } from '../../cohort/entities/cohort.entity';

export class UpdateStudentClassDto {
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    example: [
      {
        id: 256,
        oid: 'dcd60435-dfff-4c73-b8aa-1e68d56fd1c6',
        firstName: 'Max',
        surname: 'Mustermann',
        mail: 'max.mustermann@hftm.ch',
      },
    ],
  })
  persons: Person[];

  @IsNotEmpty()
  @ApiProperty({ example: Cohort })
  cohort: Cohort;
}

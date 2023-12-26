import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Subject } from '../../subject/entities/subject.entity';

export class GetExamDto {
  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  @ApiProperty({ example: 'Verteilte Systeme Test 1' })
  public name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '50%' })
  public weighting: string;

  @IsNotEmpty()
  @ApiProperty({
    example: {
      id: 43,
      name: {
        de: 'Software Engineering',
      },
      shortName: 'Q3R421.3a',
    },
  })
  public subject: Subject;
}

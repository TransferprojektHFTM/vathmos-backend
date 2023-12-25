import { Subject } from '../../subject/entities/subject.entity';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Verteilte Systeme Test 1' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '40%' })
  weighting: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ example: 1 })
  subject: Subject;
}

import { Subject } from '../../subject/entities/subject.entity';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamDto {

    @IsNotEmpty()
    @ApiProperty({ example: 'Verteilte Systeme Test 1' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ example: '40%' })
    weighting: string;

    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    modulpart: Subject;
}

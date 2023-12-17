import { ApiProperty } from '@nestjs/swagger';
import { Subject } from '../../subject/entities/subject.entity';
import { IsNotEmpty } from 'class-validator';

export class UpdateExamDto {

    @IsNotEmpty()
    @ApiProperty({ example: 'Verteilte Systeme Test 2' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ example: '40%' })
    weighting: string;

    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    modulpart: Subject;
}

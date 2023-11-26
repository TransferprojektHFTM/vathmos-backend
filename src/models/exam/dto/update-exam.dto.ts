import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExamDto } from './create-exam.dto';
import { Subject } from '../../subject/entities/subject.entity';
import { IsNotEmpty } from 'class-validator';

export class UpdateExamDto extends PartialType(CreateExamDto) {

    @IsNotEmpty()
    @ApiProperty({ example: 'Verteilte Systeme Test 1' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ example: '40%' })
    weighting: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Verteilte Systeme' })
    modulpart: Subject[];
}

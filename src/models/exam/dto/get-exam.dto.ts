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
    @ApiProperty({ example: 1 })
    public subject: Subject;
}

import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class GetSubjectDto{
    @ApiProperty({ example: 18 })
    @IsNotEmpty()
    public id: number;

    @ApiProperty({ example: {"de": "Programmierung Einführung"}})
    @IsNotEmpty()
    public name: string;

    @ApiProperty({ example: 'R8S921.3a' })
    @IsNotEmpty()
    public shortName: string;
}
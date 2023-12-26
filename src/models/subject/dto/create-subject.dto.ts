import {IsNotEmpty, IsObject, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsObject()
    @ApiProperty({example: {"de": "Software Engineering"}})
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Q3R421.3a'})
    shortName: string;
}

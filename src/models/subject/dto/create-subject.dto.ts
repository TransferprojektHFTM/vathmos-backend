import {IsNotEmpty, IsObject, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsObject()
    @ApiProperty({example: {"de": "Software Engineering"}})
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Test Unique shortName 1a'})
    shortName: string;
}

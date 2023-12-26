import {IsJSON, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateSubjectDto {
    @IsNotEmpty()
    @IsJSON()
    @ApiProperty({example: {"de": "Software Engineering"}})
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Q3R421.3a'})
    shortName: string;
}

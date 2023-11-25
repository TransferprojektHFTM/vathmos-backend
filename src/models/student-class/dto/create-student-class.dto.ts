import {Cohort} from "../../cohort/entities/cohort.entity";
import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateStudentClassDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'BBUPUL20.3a' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'fe95d302-dbc5-48c7-8a33-45460734d169' })
    oid: string;
}

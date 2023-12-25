import {IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Person} from "../../person/entities/person.entity";
import {Cohort} from "../../cohort/entities/cohort.entity";

export class CreateStudentClassDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'BBUPUL20.3a' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'fe95d302-dbc5-48c7-8a33-45460734d169' })
    oid: string;

    @IsNotEmpty()
    @IsOptional()
    persons:  Person[];

    @ApiProperty({ example: 1 })
    @IsOptional()
    cohort: Cohort;
}

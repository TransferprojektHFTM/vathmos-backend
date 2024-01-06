import {StudentClass} from "../../student-class/entities/student-class.entity";
import {DegreeProgram} from "../../degree-program/entities/degree-program.entity";
import {ApiProperty, PartialType} from "@nestjs/swagger";
import {NoScriptTags} from "../../../common/validators/noScriptTags.validator";
import {IsDate, IsNotEmpty} from "class-validator";
import {CreateCohortDto} from "./create-cohort.dto";

export class GetCohortDto extends PartialType(CreateCohortDto){
    @ApiProperty({example: '33'})
    id: number;
}

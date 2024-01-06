import {StudentClass} from "../../student-class/entities/student-class.entity";
import {DegreeProgram} from "../../degree-program/entities/degree-program.entity";
import {ApiProperty} from "@nestjs/swagger";
import {NoScriptTags} from "../../../common/validators/noScriptTags.validator";
import {IsDate, IsNotEmpty} from "class-validator";
import {Type} from "class-transformer";

export class CreateCohortDto {

    @ApiProperty({example: 'BBIN'})
    @NoScriptTags()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example:  [
            {
                "id": 7,
                "oid": "0b1e8c3f-23c8-424f-b909-c67e6f9feef4",
                "name": "BBWI22.1a"
            }
    ]})
    @IsNotEmpty()
    studentClasses: StudentClass[];

    @ApiProperty({example:
            {
                "id": 1,
                "name": {
                    "de": "Elektrotechnik HF"
                },
                "model": "VZ",
                "specialisation": {
                    "de": "Automation"
                }
            }
    })
    @IsNotEmpty()
    degreeProgram: DegreeProgram;

    @ApiProperty({example: '2021-01-02T09:03:43.000Z'})
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    startYear: Date;
}

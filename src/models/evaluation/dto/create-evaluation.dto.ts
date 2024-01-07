import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {MaxFloat} from "../../../common/validators/max-float.validator";
import {Person} from "../../person/entities/person.entity";
import {Exam} from "../../exam/entities/exam.entity";

export class CreateEvaluationDto {
    @IsNotEmpty()
    @MaxFloat(6)
    @ApiProperty({example: 5.6})
    val: number;

    @IsNotEmpty()
    @ApiProperty({example: {
            "id": 1,
            "name": "Verteilte Systeme Test 1",
            "weighting": "40%"
        }})
    exam: Exam;

    @IsNotEmpty()
    @ApiProperty({example: {
            "id": 1438,
            "oid": "d44614b5-36f9-42e2-9f5a-318c140906fd",
            "firstName": "Max",
            "surname": "muster",
            "email": "max.muster@hftm.ch",
        }
    })
    student: Person;
}

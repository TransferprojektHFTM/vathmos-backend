import {Exam} from "../../exam/entities/exam.entity";
import {Person} from "../../person/entities/person.entity";
import {IsInt, IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class GetEvaluationDto {
    @ApiProperty({example: '80'})
    val: number;

    @ApiProperty({example: {
            "id": 1,
            "name": "Verteilte Systeme Test 1",
            "weighting": "40%"
        }})
    exam: Exam;


    @ApiProperty({example: {
            "id": 1438,
            "oid": "d44614b5-36f9-42e2-9f5a-318c140906fd",
            "firstName": "Max",
            "surname": "muster",
            "email": "max.muster@hftm.ch",
            "picture": null,
            "isActivated": false,
            "lastLogin": "2000-01-01T00:00:00.000Z"
        }
    })
    student: Person;
}

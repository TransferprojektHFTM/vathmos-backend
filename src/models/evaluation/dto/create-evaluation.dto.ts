import {Exam} from "../../exam/entities/exam.entity";
import {Person} from "../../person/entities/person.entity";
import {IsInt, IsNotEmpty, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateEvaluationDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({example: '80'})
    val: number;

    @IsNotEmpty()
    @ApiProperty({example: {
            "id": 1,
            "name": "Verteilte Systeme Test 1",
            "weighting": "40%"
        }})
    @IsOptional()
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

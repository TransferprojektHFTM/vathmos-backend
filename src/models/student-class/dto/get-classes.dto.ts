import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";
import {GetPersonDto} from "../../person/dto/get-person.dto";

export class GetClassesDto{
    @ApiProperty({ example: '256' })
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @ApiProperty({ example: 'BBUPUL20.3a' })
    name: string;

    @ApiProperty({ example: 'dcd60435-dfff-4c73-b8aa-1e68d56fd1c6' })
    @IsNotEmpty()
    oid: string;

    @ApiProperty({ example: [{
            "id": 256,
            "oid": "dcd60435-dfff-4c73-b8aa-1e68d56fd1c6",
            "firstName": "Max",
            "surname": "Mustermann",
            "mail": "max.mustermann@hftm.ch",
            "picture": "data:image/png;base64,iVBORw0KGgoA........",
            "roles": "Student",
            "lastLogin": "2021-05-04T08:54:00.000Z",
            "isActivated": true
        }] })
    persons: string[];

    @ApiProperty({ example: '2' })
    cohort: string;
}
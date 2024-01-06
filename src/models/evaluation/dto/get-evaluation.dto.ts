import {ApiProperty, PartialType} from "@nestjs/swagger";
import {CreateEvaluationDto} from "./create-evaluation.dto";

export class GetEvaluationDto extends PartialType(CreateEvaluationDto){
    @ApiProperty({example: '12'})
    id: number;
}

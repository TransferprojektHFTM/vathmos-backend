import {ApiProperty, PartialType} from "@nestjs/swagger";
import {CreateModuleTypeDto} from "./create-module-type.dto";

export class GetModuleTypeDto extends PartialType(CreateModuleTypeDto){
    @ApiProperty({example: '1'})
    id: number
}

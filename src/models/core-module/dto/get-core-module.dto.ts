import {ApiProperty, PartialType} from "@nestjs/swagger";
import {CreateCoreModuleDto} from "./create-core-module.dto";


export class GetCoreModuleDto extends PartialType(CreateCoreModuleDto) {
    @ApiProperty({
        example: "12"
    })
    id: number;
}

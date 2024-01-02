import {ModuleType} from "../../module-type/entities/module-type.entity";
import {ApiProperty} from "@nestjs/swagger";


export class GetCoreModuleDto {
    @ApiProperty({
        description: 'id of core module',
        example: "12"
    })
    id: number;

    @ApiProperty({
        description: 'name of core module',
        example: {"de":"Naturwissenschaftliche Grundlagen / Konstruktion I"}
    })
    name: object;

    @ApiProperty({
        description: 'module type of core module',
        example: {
            "id": 3,
            "name": "D"}
        })
    moduleType: ModuleType;
}

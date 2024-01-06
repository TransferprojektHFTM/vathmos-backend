import {ModuleType} from "../../module-type/entities/module-type.entity";
import {ApiProperty} from "@nestjs/swagger";
import {NoScriptTags} from "../../../common/validators/noScriptTags.validator";
import {IsNotEmpty, IsObject} from "class-validator";

export class CreateCoreModuleDto {
    @ApiProperty({
        description: 'name of core module',
        example: {"de":"Naturwissenschaftliche Grundlagen / Konstruktion I"}
    })
    @IsNotEmpty()
    @IsObject()
    @NoScriptTags()
    name: string;

    @ApiProperty({
        description: 'module type of core module',
        example: {
            "id": 1,
            "name": "M"}
        })
    @IsNotEmpty()
    moduleType: ModuleType;
}

import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {NoScriptTags} from "../../../common/validators/noScriptTags.validator";

export class CreateModuleTypeDto {
    @IsNotEmpty()
    @NoScriptTags()
    @ApiProperty({example: 'E'})
    name: string
}

import {ApiProperty} from "@nestjs/swagger";

export class GetModuleTypeDto {
    @ApiProperty({example: '1'})
    id: number

    @ApiProperty({example: 'E'})
    name: string
}

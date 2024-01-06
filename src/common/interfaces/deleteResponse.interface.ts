import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponse {
  @ApiProperty({ example: '200' })
  status!: number;

  @ApiProperty({ example: 'Entity with id 2 deleted' })
  message!: string;
}

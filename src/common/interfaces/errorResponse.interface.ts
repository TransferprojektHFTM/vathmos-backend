import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ example: '404' })
  status!: number;

  @ApiProperty({ example: 'Entity with id 1 not found' })
  message!: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({ description: 'error code' })
  statusCode!: number;

  @ApiPropertyOptional({ description: 'description error code' })
  message!: string;
}

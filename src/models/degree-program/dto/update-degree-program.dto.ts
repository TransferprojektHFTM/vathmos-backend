import { PartialType } from '@nestjs/swagger';
import { CreateDegreeProgramDto } from './create-degree-program.dto';

export class UpdateDegreeProgramDto extends PartialType(
  CreateDegreeProgramDto,
) {}

import { PartialType } from '@nestjs/swagger';
import { CreateModuleTypeDto } from './create-module-type.dto';

export class UpdateModuleTypeDto extends PartialType(CreateModuleTypeDto) {}

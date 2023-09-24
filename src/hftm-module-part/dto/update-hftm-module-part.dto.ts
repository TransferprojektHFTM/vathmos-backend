import { PartialType } from '@nestjs/swagger';
import { CreateHftmModulePartDto } from './create-hftm-module-part.dto';

export class UpdateHftmModulePartDto extends PartialType(CreateHftmModulePartDto) {}

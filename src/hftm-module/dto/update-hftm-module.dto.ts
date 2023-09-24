import { PartialType } from '@nestjs/swagger';
import { CreateHftmModuleDto } from './create-hftm-module.dto';

export class UpdateHftmModuleDto extends PartialType(CreateHftmModuleDto) {}

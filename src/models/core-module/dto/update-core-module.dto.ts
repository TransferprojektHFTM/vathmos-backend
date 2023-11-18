import { PartialType } from '@nestjs/swagger';
import { CreateCoreModuleDto } from './create-core-module.dto';

export class UpdateCoreModuleDto extends PartialType(CreateCoreModuleDto) {}

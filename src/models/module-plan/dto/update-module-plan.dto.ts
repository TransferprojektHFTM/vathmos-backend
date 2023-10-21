import { PartialType } from '@nestjs/swagger';
import { CreateModulePlanDto } from './create-module-plan.dto';

export class UpdateModulePlanDto extends PartialType(CreateModulePlanDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateModulTypDto } from './create-modul-typ.dto';

export class UpdateModulTypDto extends PartialType(CreateModulTypDto) {}

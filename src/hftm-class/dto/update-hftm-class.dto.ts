import { PartialType } from '@nestjs/swagger';
import { CreateHftmClassDto } from './create-hftm-class.dto';

export class UpdateHftmClassDto extends PartialType(CreateHftmClassDto) {}

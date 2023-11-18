import { PartialType } from '@nestjs/swagger';
import { CreateHftmClassDto } from './create-student-class.dto';

export class UpdateHftmClassDto extends PartialType(CreateHftmClassDto) {}

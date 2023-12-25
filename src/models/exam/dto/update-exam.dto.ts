import { CreateExamDto } from './create-exam.dto';
import {PartialType} from "@nestjs/swagger";

export class UpdateExamDto extends PartialType(CreateExamDto) {}

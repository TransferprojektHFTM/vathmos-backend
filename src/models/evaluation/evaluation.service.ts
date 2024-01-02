import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import {AppCustomLogger} from "../../app.custom.logger";
import {InjectRepository} from "@nestjs/typeorm";
import {Evaluation} from "./entities/evaluation.entity";
import {Repository} from "typeorm";

@Injectable()
export class EvaluationService {
  private readonly logger = new AppCustomLogger(EvaluationService.name);

  constructor(
      @InjectRepository(Evaluation)
      private evaluationRepository: Repository<Evaluation>) {
  }
  create(createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationRepository.save(createEvaluationDto);
  }

  findAll() {
    return this.evaluationRepository.find({relations: ['exam', 'student']})
  }

  async findOne(id: number) {
    const entity = await this.evaluationRepository.findOne({
      where: {id: id},
      relations: ['exam', 'student']
    });
    if (!entity) {
      this.logger.warn(`E with id ${id} not found`);
      throw new NotFoundException(`Evaluation with id ${id} not found`);
    }
    return entity;

  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    const updateResult = await this.evaluationRepository.update(id, updateEvaluationDto);
    if (updateResult.affected === 1) {
      this.logger.log(`Evaluation with id ${id} updated`);
      return this.findOne(id);
    } else {
      throw new NotFoundException(`Evaluation with id ${id} not found`);
    }
  }

  async remove(id: number) {
    const deleteResult = await this.evaluationRepository.delete(id);
    if (deleteResult.affected === 1) {
      this.logger.log(`Evaluation with id ${id} deleted`);
      return {message: `Evaluation with id ${id} deleted`, status: 200};
    } else {
      throw new NotFoundException(`Evaluation with id ${id} not found`);
    }
  }
}

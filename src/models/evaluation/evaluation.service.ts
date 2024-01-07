import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import {AppCustomLogger} from "../../app.custom.logger";
import {InjectRepository} from "@nestjs/typeorm";
import {Evaluation} from "./entities/evaluation.entity";
import {Repository} from "typeorm";
import {GetEvaluationDto} from "./dto/get-evaluation.dto";

@Injectable()
export class EvaluationService {
  private readonly logger = new AppCustomLogger(EvaluationService.name);

  constructor(
      @InjectRepository(Evaluation)
      private evaluationRepository: Repository<Evaluation>) {
  }
  async create(createEvaluationDto: CreateEvaluationDto) {
    const evaluation = new Evaluation();
    evaluation.val = this.ConvertToVal(createEvaluationDto.val)
    evaluation.exam = createEvaluationDto.exam;
    evaluation.student = createEvaluationDto.student;
    try {
      return await this.evaluationRepository.save(evaluation);
    }catch (e) {
      throw new NotAcceptableException(`Cannot add a second evaluation from same exam ${createEvaluationDto.exam.id} or student ${createEvaluationDto.student.id}`)
    }
  }

  async findAll() {
    return await this.evaluationRepository.find({relations: ['exam', 'student']})
        .then((evaluations) => {
        return evaluations.map((evaluation) => {
            let modifiedEvaluation: GetEvaluationDto = evaluation;
            modifiedEvaluation.percent = evaluation.val
            modifiedEvaluation.val = this.ConvertToPercent(evaluation.val)
            return modifiedEvaluation;
        })
    }).catch((e) => {
      this.logger.error(e.message);
    });
  }

  async findOne(id: number) {
    const entity = await this.evaluationRepository.findOne({
      where: {id: id},
      relations: ['exam', 'student']
    }).then((evaluation) => {
        let modifiedEvaluation: GetEvaluationDto = evaluation;
        modifiedEvaluation.percent =  evaluation.val
        modifiedEvaluation.val =  this.ConvertToPercent(evaluation.val)
        return modifiedEvaluation;
    }).catch((e) => {
      this.logger.error(e.message);
    });

    if(entity){
      return entity;
    }else {
      this.logger.warn(`E with id ${id} not found`);
      throw new NotFoundException(`Evaluation with id ${id} not found`);
    }
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {

    const updateResult = await this.evaluationRepository.createQueryBuilder()
        .update()
        .where("id = :id", { id: id })
        .set({ val: updateEvaluationDto.val })
        .execute()

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

  private ConvertToPercent(val: number): number {
    return Number(((val / 100 + 0.2) * 5).toFixed(2))
  }
  private ConvertToVal(val: number): number {
    return Number(((val * 0.2-0.2)*100).toFixed(2))
  }
}

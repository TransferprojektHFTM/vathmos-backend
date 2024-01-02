import { Module } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CohortController } from './cohort.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Cohort} from "./entities/cohort.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cohort])],
  controllers: [CohortController],
  providers: [CohortService],
})
export class CohortModule {}

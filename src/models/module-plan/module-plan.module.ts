import { Module } from '@nestjs/common';
import { ModulePlanService } from './module-plan.service';
import { ModulePlanController } from './module-plan.controller';

@Module({
  controllers: [ModulePlanController],
  providers: [ModulePlanService],
})
export class ModulePlanModule {}

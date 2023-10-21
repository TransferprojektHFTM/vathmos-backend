import { Module } from '@nestjs/common';
import { HftmModuleService } from './hftm-module.service';
import { HftmModuleController } from './hftm-module.controller';

@Module({
  controllers: [HftmModuleController],
  providers: [HftmModuleService],
})
export class HftmModuleModule {}

import { Module } from '@nestjs/common';
import { HftmModulePartService } from './hftm-module-part.service';
import { HftmModulePartController } from './hftm-module-part.controller';

@Module({
  controllers: [HftmModulePartController],
  providers: [HftmModulePartService],
})
export class HftmModulePartModule {}

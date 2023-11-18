import { Module } from '@nestjs/common';
import { CoreModuleService } from './core-module.service';
import { CoreModuleController } from './core-module.controller';

@Module({
  controllers: [CoreModuleController],
  providers: [CoreModuleService],
})
export class CoreModuleModule {}

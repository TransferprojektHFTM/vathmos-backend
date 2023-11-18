import { Module } from '@nestjs/common';
import { ModuleTypeService } from './module-type.service';
import { ModuleTypeController } from './module-type.controller';

@Module({
  controllers: [ModuleTypeController],
  providers: [ModuleTypeService],
})
export class ModuleTypeModule {}

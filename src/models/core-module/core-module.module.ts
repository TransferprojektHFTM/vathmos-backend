import { Module } from '@nestjs/common';
import { CoreModuleService } from './core-module.service';
import { CoreModuleController } from './core-module.controller';
import { CoreModule } from './entities/core-module.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CoreModule])],
  controllers: [CoreModuleController],
  providers: [CoreModuleService],
})
export class CoreModuleModule {}

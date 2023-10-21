import { Module } from '@nestjs/common';
import { HftmClassService } from './hftm-class.service';
import { HftmClassController } from './hftm-class.controller';

@Module({
  controllers: [HftmClassController],
  providers: [HftmClassService],
})
export class HftmClassModule {}

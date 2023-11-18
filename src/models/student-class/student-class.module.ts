import { Module } from '@nestjs/common';
import { HftmClassService } from './student-class.service';
import { HftmClassController } from './student-class.controller';

@Module({
  controllers: [HftmClassController],
  providers: [HftmClassService],
})
export class HftmClassModule {}

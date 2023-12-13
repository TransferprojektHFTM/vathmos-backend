import { Module } from '@nestjs/common';
import { DegreeProgramService } from './degree-program.service';
import { DegreeProgramController } from './degree-program.controller';

@Module({
  controllers: [DegreeProgramController],
  providers: [DegreeProgramService],
})
export class DegreeProgramModule {}

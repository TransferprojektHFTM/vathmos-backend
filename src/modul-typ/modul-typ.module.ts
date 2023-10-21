import { Module } from '@nestjs/common';
import { ModulTypService } from './modul-typ.service';
import { ModulTypController } from './modul-typ.controller';

@Module({
  controllers: [ModulTypController],
  providers: [ModulTypService],
})
export class ModulTypModule {}

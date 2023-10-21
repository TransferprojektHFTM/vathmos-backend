import { Test, TestingModule } from '@nestjs/testing';
import { ModulTypController } from './modul-typ.controller';
import { ModulTypService } from './modul-typ.service';

describe('ModulTypController', () => {
  let controller: ModulTypController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulTypController],
      providers: [ModulTypService],
    }).compile();

    controller = module.get<ModulTypController>(ModulTypController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

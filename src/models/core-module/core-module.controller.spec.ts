import { Test, TestingModule } from '@nestjs/testing';
import { CoreModuleController } from './core-module.controller';
import { CoreModuleService } from './core-module.service';

describe('CoreModuleController', () => {
  let controller: CoreModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoreModuleController],
      providers: [CoreModuleService],
    }).compile();

    controller = module.get<CoreModuleController>(CoreModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

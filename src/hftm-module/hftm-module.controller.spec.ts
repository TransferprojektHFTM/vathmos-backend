import { Test, TestingModule } from '@nestjs/testing';
import { HftmModuleController } from './hftm-module.controller';
import { HftmModuleService } from './hftm-module.service';

describe('HftmModuleController', () => {
  let controller: HftmModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HftmModuleController],
      providers: [HftmModuleService],
    }).compile();

    controller = module.get<HftmModuleController>(HftmModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

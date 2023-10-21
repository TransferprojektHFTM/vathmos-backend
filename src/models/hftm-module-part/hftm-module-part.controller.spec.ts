import { Test, TestingModule } from '@nestjs/testing';
import { HftmModulePartController } from './hftm-module-part.controller';
import { HftmModulePartService } from './hftm-module-part.service';

describe('HftmModulePartController', () => {
  let controller: HftmModulePartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HftmModulePartController],
      providers: [HftmModulePartService],
    }).compile();

    controller = module.get<HftmModulePartController>(HftmModulePartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ModulePlanController } from './module-plan.controller';
import { ModulePlanService } from './module-plan.service';

describe('ModulePlanController', () => {
  let controller: ModulePlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModulePlanController],
      providers: [ModulePlanService],
    }).compile();

    controller = module.get<ModulePlanController>(ModulePlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

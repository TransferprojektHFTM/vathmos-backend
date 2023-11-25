import { Test, TestingModule } from '@nestjs/testing';
import { ModuleTypeController } from './module-type.controller';
import { ModuleTypeService } from './module-type.service';

describe('ModuleTypeController', () => {
  let controller: ModuleTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModuleTypeController],
      providers: [ModuleTypeService],
    }).compile();

    controller = module.get<ModuleTypeController>(ModuleTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HftmModuleService } from './hftm-module.service';

describe('HftmModuleService', () => {
  let service: HftmModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HftmModuleService],
    }).compile();

    service = module.get<HftmModuleService>(HftmModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

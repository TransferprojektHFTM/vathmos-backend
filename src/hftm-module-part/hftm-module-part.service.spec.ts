import { Test, TestingModule } from '@nestjs/testing';
import { HftmModulePartService } from './hftm-module-part.service';

describe('HftmModulePartService', () => {
  let service: HftmModulePartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HftmModulePartService],
    }).compile();

    service = module.get<HftmModulePartService>(HftmModulePartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CoreModuleService } from './core-module.service';

describe('CoreModuleService', () => {
  let service: CoreModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoreModuleService],
    }).compile();

    service = module.get<CoreModuleService>(CoreModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

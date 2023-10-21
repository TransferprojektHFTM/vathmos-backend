import { Test, TestingModule } from '@nestjs/testing';
import { HftmClassService } from './hftm-class.service';

describe('HftmClassService', () => {
  let service: HftmClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HftmClassService],
    }).compile();

    service = module.get<HftmClassService>(HftmClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

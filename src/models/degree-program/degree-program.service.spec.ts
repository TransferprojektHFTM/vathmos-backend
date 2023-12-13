import { Test, TestingModule } from '@nestjs/testing';
import { DegreeProgramService } from './degree-program.service';

describe('DegreeProgramService', () => {
  let service: DegreeProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DegreeProgramService],
    }).compile();

    service = module.get<DegreeProgramService>(DegreeProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

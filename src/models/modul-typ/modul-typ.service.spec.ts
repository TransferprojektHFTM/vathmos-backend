import { Test, TestingModule } from '@nestjs/testing';
import { ModulTypService } from './modul-typ.service';

describe('ModulTypService', () => {
  let service: ModulTypService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModulTypService],
    }).compile();

    service = module.get<ModulTypService>(ModulTypService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DegreeProgramController } from './degree-program.controller';
import { DegreeProgramService } from './degree-program.service';

describe('DegreeProgramController', () => {
  let controller: DegreeProgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DegreeProgramController],
      providers: [DegreeProgramService],
    }).compile();

    controller = module.get<DegreeProgramController>(DegreeProgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

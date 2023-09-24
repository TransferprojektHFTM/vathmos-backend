import { Test, TestingModule } from '@nestjs/testing';
import { HftmClassController } from './hftm-class.controller';
import { HftmClassService } from './hftm-class.service';

describe('HftmClassController', () => {
  let controller: HftmClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HftmClassController],
      providers: [HftmClassService],
    }).compile();

    controller = module.get<HftmClassController>(HftmClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

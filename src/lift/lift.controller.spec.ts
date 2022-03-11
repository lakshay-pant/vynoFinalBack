import { Test, TestingModule } from '@nestjs/testing';
import { LiftController } from './lift.controller';
import { LiftService } from './lift.service';

describe('LiftController', () => {
  let controller: LiftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LiftController],
      providers: [LiftService],
    }).compile();

    controller = module.get<LiftController>(LiftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

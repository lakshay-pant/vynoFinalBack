import { Test, TestingModule } from '@nestjs/testing';
import { LiftService } from './lift.service';

describe('LiftService', () => {
  let service: LiftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LiftService],
    }).compile();

    service = module.get<LiftService>(LiftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SingupService } from './singup.service';

describe('SingupService', () => {
  let service: SingupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingupService],
    }).compile();

    service = module.get<SingupService>(SingupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { SingupController } from './singup.controller';
import { SingupService } from './singup.service';

describe('SingupController', () => {
  let controller: SingupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SingupController],
      providers: [SingupService],
    }).compile();

    controller = module.get<SingupController>(SingupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

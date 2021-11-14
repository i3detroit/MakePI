import { Test, TestingModule } from '@nestjs/testing';
import { AccessGuard } from './access.guard';

describe('AccessGuard', () => {
  let service: AccessGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessGuard],
    }).compile();

    service = module.get<AccessGuard>(AccessGuard);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

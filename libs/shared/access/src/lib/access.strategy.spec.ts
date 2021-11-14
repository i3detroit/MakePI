import { Test, TestingModule } from '@nestjs/testing';
import { AccessStrategy } from './access.strategy';

describe('AccessStrategy', () => {
  let service: AccessStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessStrategy],
    }).compile();

    service = module.get<AccessStrategy>(AccessStrategy);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

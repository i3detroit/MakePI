import { Test } from '@nestjs/testing';
import { AccessService } from './access.service';

describe('SharedAccessService', () => {
  let service: AccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AccessService],
    }).compile();

    service = module.get(AccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

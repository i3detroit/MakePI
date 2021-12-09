import { Test } from '@nestjs/testing';
import { SharedSecretsService } from './shared-secrets.service';

describe('SharedSecretsService', () => {
  let service: SharedSecretsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SharedSecretsService],
    }).compile();

    service = module.get(SharedSecretsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

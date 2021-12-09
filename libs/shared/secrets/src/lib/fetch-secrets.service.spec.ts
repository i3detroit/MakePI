import { Test, TestingModule } from '@nestjs/testing';
import { FetchSecretsService } from './fetch-secrets.service';

describe('FetchSecretsService', () => {
  let service: FetchSecretsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchSecretsService],
    }).compile();

    service = module.get<FetchSecretsService>(FetchSecretsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

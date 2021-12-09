import { Test } from '@nestjs/testing';
import { SharedAwsSecretsManagerService } from './shared-aws-secrets-manager.service';

describe('SharedAwsSecretsManagerService', () => {
  let service: SharedAwsSecretsManagerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SharedAwsSecretsManagerService],
    }).compile();

    service = module.get(SharedAwsSecretsManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});

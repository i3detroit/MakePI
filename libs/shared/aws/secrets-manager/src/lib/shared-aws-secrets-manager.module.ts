import { Module } from '@nestjs/common';
import { SharedAwsSecretsManagerService } from './shared-aws-secrets-manager.service';

@Module({
  controllers: [],
  providers: [SharedAwsSecretsManagerService],
  exports: [SharedAwsSecretsManagerService],
})
export class SharedAwsSecretsManagerModule {}

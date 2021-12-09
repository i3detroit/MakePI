import { Module } from '@nestjs/common';
import { SharedSecretsService } from './shared-secrets.service';

@Module({
  controllers: [],
  providers: [SharedSecretsService],
  exports: [SharedSecretsService],
})
export class SharedSecretsModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedAwsSecretsManagerService } from './shared-aws-secrets-manager.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [SharedAwsSecretsManagerService],
  exports: [SharedAwsSecretsManagerService],
})
export class SharedAwsSecretsManagerModule {}

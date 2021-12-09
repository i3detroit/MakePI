import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecretNames } from '@make-pi/global-config';
import { SharedSecretsErrors } from './shared-secrets.interface';
import { SharedAwsSecretsManagerService } from '@make-pi/shared/aws/secrets-manager';

@Injectable()
export class FetchSecretsService {
  constructor(
    private configService: ConfigService,
    private secretsMangerService: SharedAwsSecretsManagerService
  ) {}

  async fetchSecrets(
    secretNames: SecretNames[]
  ): Promise<{ [key: string]: string }> {
    const secretConfig = {};

    if (!secretNames.length) {
      throw new Error(SharedSecretsErrors.SECRETS_LIST_EMPTY);
    }

    await Promise.all(
      secretNames.map(async (secretName) => {
        secretConfig[secretName] = await this.getSecret(secretName);
      })
    );

    return secretConfig;
  }

  getSecret(secretName: string): Promise<string> {
    return this.secretsMangerService.getSecretValueFromJson(
      this.configService.get<string>(secretName)
    );
  }
}

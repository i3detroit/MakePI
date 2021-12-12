import { Injectable } from '@nestjs/common';
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { SharedAwsSecretsManagerErrors } from './shared-aws-secrets-manager.interface';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedAwsSecretsManagerService {
  private secretsManager = new SecretsManager({
    credentials: fromIni({
      profile: this.configService.get<string>('MAKEPI_CREDENTIALS_PROFILE'),
    }),
  });

  constructor(private configService: ConfigService) {}

  async getSecretValueFromJson<T>(secretName: string): Promise<T> {
    const commandOutput = await this.secretsManager.getSecretValue({
      SecretId: secretName,
    });

    if (this.isJson(commandOutput.SecretString)) {
      const { value } = JSON.parse(commandOutput.SecretString);
      return value;
    } else {
      throw new Error(SharedAwsSecretsManagerErrors.INVALID_JSON);
    }
  }

  private isJson(str: string) {
    try {
      JSON.parse(str);
    } catch (_err) {
      return false;
    }
    return true;
  }
}

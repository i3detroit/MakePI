import { Injectable } from '@nestjs/common';
import { SecretsManager } from '@aws-sdk/client-secrets-manager';
import { SharedAwsSecretsManagerErrors } from './shared-aws-secrets-manager.interface';

@Injectable()
export class SharedAwsSecretsManagerService {
  private secretsManager = new SecretsManager({});

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

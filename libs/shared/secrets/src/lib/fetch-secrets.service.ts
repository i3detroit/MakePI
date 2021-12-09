import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SecretNames } from '@make-pi/global-config';
import { SharedSecretsErrors } from './shared-secrets.interface';

@Injectable()
export class FetchSecretsService {
  constructor(private configService: ConfigService) {}

  async fetchSecrets(
    secretNames: SecretNames[]
  ): Promise<{ [key: string]: string }> {
    const secretConfig = {};

    if (!secretNames.length) {
      throw new Error(SharedSecretsErrors.SECRETS_LIST_EMPTY);
    }

    await Promise.all(
      secretNames.map((secretName) => this.getSecret(secretName))
    );

    return secretConfig;
  }

  async getSecret(secretName: string) {}
}

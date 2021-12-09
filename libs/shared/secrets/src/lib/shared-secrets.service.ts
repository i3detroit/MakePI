import { SecretNames } from '@make-pi/global-config';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SharedSecretsService {
  constructor(
    @Inject('FETCH_SECRETS')
    private secretConfig: { [key: string]: any }
  ) {}

  get<T>(secretName: SecretNames): T {
    if (!this.secretConfig[secretName]) {
      throw new Error(`Secret '${secretName}' was not found`);
    }
    return this.secretConfig[secretName];
  }
}

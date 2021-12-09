import { SecretNames } from '@make-pi/global-config';

export interface SharedSecretsOptions {
  secrets: SecretNames[];
}

export enum SharedSecretsErrors {
  SECRETS_LIST_EMPTY = 'Secrets list is empty',
}

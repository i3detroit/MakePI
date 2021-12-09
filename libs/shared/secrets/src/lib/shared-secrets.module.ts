import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FetchSecretsService } from './fetch-secrets.service';
import { SharedSecretsOptions } from './shared-secrets.interface';
import { SharedSecretsService } from './shared-secrets.service';
@Module({
  providers: [FetchSecretsService],
})
export class SecretConfigModule {
  static register;

  public static registerAsync(options: SharedSecretsOptions): DynamicModule {
    return {
      module: SecretConfigModule,
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        { provide: SharedSecretsService, useClass: SharedSecretsService },
        FetchSecretsService,
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        {
          provide: 'FETCH_SECRETS',
          useFactory: async (fetchSecretsFactory: FetchSecretsService) =>
            await fetchSecretsFactory.fetchSecrets(options.secrets),
          inject: [FetchSecretsService],
        },
      ],
      exports: [
        // { provide: SecretConfigService, useClass: SecretConfigService },
      ],
    };
  }
}

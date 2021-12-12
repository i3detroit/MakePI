import { PaymentMethodTypes } from '@make-pi/global-config';
import { IsEnum, IsString } from 'class-validator';

export interface CreateStripeBankAccountData {
  paymentMethodType: PaymentMethodTypes;
  publicToken: string;
}

export class CreateStripeBankAccountDataDto
  implements CreateStripeBankAccountData
{
  @IsEnum(PaymentMethodTypes)
  paymentMethodType: PaymentMethodTypes;

  @IsString()
  publicToken: string;
}

import { Module } from '@nestjs/common';
import { ModelsPaymentSourceService } from './models-payment-source.service';

@Module({
  controllers: [],
  providers: [ModelsPaymentSourceService],
  exports: [ModelsPaymentSourceService],
})
export class ModelsPaymentSourceModule {}

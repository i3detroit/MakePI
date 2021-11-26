import { Module } from '@nestjs/common';
import { ModelsPaymentSourceService } from './payment-source.service';

@Module({
  controllers: [],
  providers: [ModelsPaymentSourceService],
  exports: [ModelsPaymentSourceService],
})
export class ModelsPaymentSourceModule {}

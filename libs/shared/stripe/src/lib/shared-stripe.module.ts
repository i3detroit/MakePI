import { Module } from '@nestjs/common';
import { SharedStripeService } from './shared-stripe.service';

@Module({
  controllers: [],
  providers: [SharedStripeService],
  exports: [SharedStripeService],
})
export class SharedStripeModule {}

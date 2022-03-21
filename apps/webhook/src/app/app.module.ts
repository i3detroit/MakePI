import { SharedStripeModule } from '@make-pi/shared/stripe';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

@Module({
  imports: [SharedStripeModule],
  controllers: [AppController],
})
export class AppModule {}

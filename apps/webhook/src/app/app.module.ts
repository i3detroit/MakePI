import { SharedStripeModule } from '@make-pi/shared/stripe';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SharedStripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

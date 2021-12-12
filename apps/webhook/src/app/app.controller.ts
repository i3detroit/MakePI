import {
  StripeWebhookRequest,
  StripeWebhooksService,
} from '@make-pi/shared/stripe';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller('stripe')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private stripeWebhooksService: StripeWebhooksService
  ) {}

  @Post()
  async stripeWebhooks(@Body() body, @Request() req: StripeWebhookRequest) {
    let event;
    try {
      event = await this.stripeWebhooksService.constructEvent(
        body,
        req.headers.STRIPE_SIGNATURE
      );
      console.log(event);
    } catch (err) {
      console.error(err);
      throw new BadRequestException({ message: [err?.message] });
    }
  }
}

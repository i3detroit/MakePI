import { AppRequest, AuthGuard } from '@make-pi/shared/auth';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  BadRequestException,
  Get,
} from '@nestjs/common';
import {
  PaymentMethodsService,
  CreateStripeBankAccountDataDto,
} from '@make-pi/payment-methods';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('payment-source')
@UseGuards(AuthGuard)
export class PaymentSourceController {
  constructor(private paymentsService: PaymentMethodsService) {}

  @Post()
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'payment-source',
    action: 'create',
    possession: 'own',
  })
  @UsePipes(new ValidationPipe())
  async createPayment(
    @Body() body: CreateStripeBankAccountDataDto,
    @Request() req: AppRequest
  ) {
    try {
      return await this.paymentsService.create(
        body.paymentMethodType,
        req.user.sub,
        body
      );
    } catch (err) {
      throw new BadRequestException({ message: [err.message] });
    }
  }

  @Get()
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'payment-source',
    action: 'read',
    possession: 'own',
  })
  @UsePipes(new ValidationPipe())
  async getPayment(@Request() req: AppRequest) {
    try {
      return await this.paymentsService.getAllByUserId(req.user.sub);
    } catch (err) {
      throw new BadRequestException({ message: [err.message] });
    }
  }
}

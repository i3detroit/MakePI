import { PaymentsService } from '@make-pi/models/payments';
import { AuthGuard } from '@make-pi/shared/auth';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('payment-source')
@UseGuards(AuthGuard)
export class PaymentSourceController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'payment-source',
    action: 'create',
    possession: 'own',
  })
  @UsePipes(new ValidationPipe())
  async createPayment(@Body() body) {}
}

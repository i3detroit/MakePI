import { AuthGuard } from '@make-pi/shared/auth';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentsService } from '@make-pi/models/payments';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(ACGuard)
  @UseRoles({
    resource: 'payment',
    action: 'create',
    possession: 'own',
  })
  @UsePipes(new ValidationPipe())
  async createPayment(@Body() body) {}
}

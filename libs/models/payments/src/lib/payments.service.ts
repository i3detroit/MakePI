import { Payment, PaymentSource, User } from '@make-pi/shared/database';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePayment, UpdatePayment } from './payments.interface';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: Repository<Payment>
  ) {}

  findOneById(id: string): Promise<Payment> {
    return this.paymentRepository.findOne(id, {
      relations: ['user', 'paymentSource'],
    });
  }

  findAllByUser(id: string): Promise<Payment[]> {
    const user = new User();
    user.id = id;
    return this.paymentRepository.find({ user });
  }

  findAllByPaymentSource(id: string): Promise<Payment[]> {
    const paymentSource = new PaymentSource();
    paymentSource.id = id;
    return this.paymentRepository.find({ paymentSource });
  }

  async create(data: CreatePayment): Promise<Payment> {
    const user = new User();
    user.id = data.userId;
    const paymentSource = new PaymentSource();
    paymentSource.id = data.paymentSourceId;
    const payment = new Payment();
    const result = await this.paymentRepository.insert(
      Object.assign(payment, {
        user,
        paymentSource,
        amount: data.amount,
        status: data.status,
        statusHistory: [
          {
            timestamp: new Date().toISOString(),
            status: data.status,
            metadata: data.metadata,
          },
        ],
      })
    );
    const [generatedMap] = result.generatedMaps;
    return generatedMap as Payment;
  }

  async update(id: string, data: UpdatePayment): Promise<Payment> {
    const payment = await this.paymentRepository.findOne(id);
    payment.status = data.status;
    payment.statusHistory.push({
      timestamp: new Date().toISOString(),
      status: data.status,
      metadata: data.metadata,
    });
    return await this.paymentRepository.save(payment);
  }
}

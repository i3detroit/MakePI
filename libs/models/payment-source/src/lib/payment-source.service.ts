import { PaymentSource, User } from '@make-pi/shared/database';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdatePaymentSource } from '..';
import { CreatePaymentSource } from './payment-source.interface';

@Injectable()
export class ModelsPaymentSourceService {
  constructor(
    @Inject('PAYMENT_SOURCE_REPOSITORY')
    private paymentSourceRepository: Repository<PaymentSource>
  ) {}

  findOneById(id: string): Promise<PaymentSource> {
    return this.paymentSourceRepository.findOne(id, { relations: ['user'] });
  }

  findAllByUser(id: string): Promise<PaymentSource[]> {
    const user = new User();
    user.id = id;
    return this.paymentSourceRepository.find({ user });
  }

  async create(data: CreatePaymentSource): Promise<PaymentSource> {
    const user = new User();
    user.id = data.userId;
    const payment = new PaymentSource();
    const result = await this.paymentSourceRepository.insert(
      Object.assign(payment, {
        method: data.method,
        sourceId: data.sourceId,
        verified: data.verified,
        metadata: data.metadata,
        user,
      })
    );
    const [generatedMap] = result.generatedMaps;
    return generatedMap as PaymentSource;
  }

  async update(id: string, data: UpdatePaymentSource): Promise<PaymentSource> {
    const result = await this.paymentSourceRepository.update(id, data);
    const [generatedMap] = result.generatedMaps;
    return generatedMap as PaymentSource;
  }
}

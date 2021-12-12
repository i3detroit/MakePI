import { PaymentSource, User } from '@make-pi/shared/database';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdatePaymentSource } from '..';
import { CreatePaymentSource } from './payment-sources.interface';

@Injectable()
export class PaymentSourcesService {
  constructor(
    @Inject('PAYMENT_SOURCE_REPOSITORY')
    private paymentSourceRepository: Repository<PaymentSource>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>
  ) {}

  findOneById(id: string): Promise<PaymentSource> {
    return this.paymentSourceRepository.findOne(id, { relations: ['user'] });
  }

  findAllByUser(id: string): Promise<User> {
    return this.userRepository.findOne(id, { relations: ['paymentSources'] });
  }

  async create(data: CreatePaymentSource): Promise<PaymentSource> {
    const user = new User();
    user.id = data.userId;
    const paymentSource = new PaymentSource();
    const result = await this.paymentSourceRepository.insert(
      Object.assign(paymentSource, {
        method: data.method,
        sourceId: data.sourceId,
        verified: data.verified,
        enabled: data.enabled,
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

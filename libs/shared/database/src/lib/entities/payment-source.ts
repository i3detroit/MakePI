import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentMethod } from '@make-pi/global-config';
import { User } from './user.entity';

export interface PaymentSourceMetadata {
  brand?: string;
  last4?: string;
  funding?: string;
  bank_name?: string;
}

@Entity()
export class PaymentSource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128 })
  @Index()
  method: PaymentMethod;

  @OneToOne(() => User, (user) => user.paymentSource)
  @Index()
  user: User;

  @Column({ length: 1024 })
  @Index()
  sourceId: string;

  @Column({ type: 'json' })
  metadata: PaymentSourceMetadata;

  @Column('bool')
  verified: boolean;
}

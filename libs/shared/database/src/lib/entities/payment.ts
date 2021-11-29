import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentSource } from './payment-source';
import { User } from './user.entity';

export enum PaymentStatus {
  PENDING,
  COMPLETE,
  FAILED,
}

export interface PaymentStatusHistory {
  timestamp: string;
  status: PaymentStatus;
  metadata?;
}
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.payments)
  @Index()
  user: User;

  @ManyToOne(() => PaymentSource, (paymentSource) => paymentSource.payments)
  @Index()
  paymentSource: PaymentSource;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'tinyint' })
  @Index()
  status: PaymentStatus;

  @Column({ type: 'json' })
  statusHistory: PaymentStatusHistory[];
}

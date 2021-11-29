import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Payment } from './payment';

@Entity()
export class PaymentSource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 128 })
  @Index()
  method: string;

  @ManyToOne(() => User, (user) => user.paymentSources)
  @Index()
  user: User;

  @OneToMany(() => Payment, (payment) => payment.paymentSource)
  payments: Payment[];

  @Column({ length: 1024 })
  @Index()
  sourceId: string;

  @Column({ type: 'json' })
  metadata;

  @Column('bool')
  verified: boolean;

  @Column('bool')
  enabled: boolean;
}

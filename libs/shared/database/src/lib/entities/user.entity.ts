import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Payment } from './payment';
import { PaymentSource } from './payment-source';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 1024 })
  @Index({ unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column('int', { default: 0 })
  loginAttempts: number;

  @Column({ type: 'timestamp', nullable: true })
  lockUntil: Date;

  @Column({ length: 36, nullable: true })
  recoverCode: string;

  @Index()
  @Column('boolean', { default: true })
  active: boolean;

  @Column({ length: 36, nullable: true })
  verificationCode: string;

  @OneToMany(() => Role, (role) => role.user)
  roles: Role[];

  @OneToMany(() => PaymentSource, (paymentSource) => paymentSource.user)
  @JoinColumn()
  paymentSources: PaymentSource[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @Column({
    type: 'uuid',
    nullable: true,
  })
  stripeCustomerId?: string;
}

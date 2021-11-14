import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Role } from './roles.entity';

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
}

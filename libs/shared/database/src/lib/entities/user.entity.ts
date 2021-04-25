import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 1024 })
  @Index({ unique: true })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
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
}

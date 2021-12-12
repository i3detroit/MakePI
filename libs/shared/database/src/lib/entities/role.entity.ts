import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique('roles_index', ['role', 'user'])
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 36 })
  role: string;

  @ManyToOne(() => User, (user) => user.roles)
  @JoinColumn()
  user: User;
}

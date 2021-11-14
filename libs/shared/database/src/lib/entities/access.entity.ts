import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from './user.entity';
import { Role } from '@make-pi/global-config';

@Entity()
@Unique('access_index', ['role', 'user'])
export class Access {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  role: Role;

  @ManyToOne(() => User, (user) => user.access)
  user: User;
}

import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Role } from '@make-pi/global-config';

@Entity()
@Unique('access_index', ['role', 'user'])
export class AccessEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  role: Role;

  @ManyToOne(() => UserEntity, (user) => user.access)
  user: UserEntity;
}

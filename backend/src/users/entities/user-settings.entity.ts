import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_settings' })
export class UserSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'user_id', type: 'int', unique: true })
  userId!: number;

  @OneToOne(() => User, (user) => user.settings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 10, default: 'EN' })
  language!: string;

  @Column({ name: 'primary_color', type: 'varchar', length: 20, default: '#5B2EFF' })
  primaryColor!: string;

  @Column({ name: 'secondary_color', type: 'varchar', length: 20, default: '#111115' })
  secondaryColor!: string;

  @Column({ type: 'varchar', length: 20, default: 'dark' })
  theme!: string;
}

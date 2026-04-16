import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { UserSettings } from './user-settings.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index('IDX_USERS_USERNAME_UNIQUE', { unique: true })
  @Column({ type: 'varchar', length: 50 })
  username!: string;

  @Index('IDX_USERS_EMAIL_UNIQUE', { unique: true })
  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255, select: false })
  passwordHash!: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName!: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate!: string;

  @Column({ type: 'varchar', length: 255 })
  school!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role!: UserRole;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt!: Date;

  @OneToOne(() => UserSettings, (settings) => settings.user, {
    cascade: false,
  })
  settings!: UserSettings;
}

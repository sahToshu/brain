import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserSettings } from '../users/entities/user-settings.entity';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/user-role.enum';

const DEFAULT_USER_SETTINGS = {
  language: 'EN',
  primaryColor: '#5B2EFF',
  secondaryColor: '#111115',
  theme: 'dark',
} as const;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const normalizedUsername = registerUserDto.username.trim().toLowerCase();
    const normalizedEmail = registerUserDto.email.trim().toLowerCase();

    await this.ensureUserDoesNotExist(normalizedUsername, normalizedEmail);

    const passwordHash = await bcrypt.hash(registerUserDto.password, 12);

    try {
      return await this.dataSource.transaction(async (manager) => {
        const userRepository = manager.getRepository(User);
        const settingsRepository = manager.getRepository(UserSettings);

        const user = userRepository.create({
          username: normalizedUsername,
          email: normalizedEmail,
          passwordHash,
          fullName: registerUserDto.fullName.trim(),
          birthDate: registerUserDto.birthDate.toISOString().slice(0, 10),
          school: registerUserDto.school.trim(),
          role: UserRole.GUEST,
        });

        const savedUser = await userRepository.save(user);

        const settings = settingsRepository.create({
          userId: savedUser.id,
          ...DEFAULT_USER_SETTINGS,
        });

        const savedSettings = await settingsRepository.save(settings);

        return {
          user: this.toUserResponse(savedUser),
          settings: this.toSettingsResponse(savedSettings),
        };
      });
    } catch (error) {
      if (this.isUniqueViolation(error)) {
        throw new ConflictException('Username or email is already in use');
      }

      throw new InternalServerErrorException('Unable to register user');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const normalizedCredential = loginUserDto.credential.trim().toLowerCase();

    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .leftJoinAndSelect('user.settings', 'settings')
      .where('LOWER(user.username) = :credential', { credential: normalizedCredential })
      .orWhere('LOWER(user.email) = :credential', { credential: normalizedCredential })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid username/email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username/email or password');
    }

    return {
      user: this.toUserResponse(user),
      settings: user.settings ? this.toSettingsResponse(user.settings) : null,
    };
  }

  private async ensureUserDoesNotExist(username: string, email: string): Promise<void> {
    const existingUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('LOWER(user.username) = :username', { username })
      .orWhere('LOWER(user.email) = :email', { email })
      .getOne();

    if (!existingUser) {
      return;
    }

    if (existingUser.username === username) {
      throw new ConflictException('Username is already in use');
    }

    throw new ConflictException('Email is already in use');
  }

  private toUserResponse(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      birthDate: user.birthDate,
      school: user.school,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  private toSettingsResponse(settings: UserSettings) {
    return {
      id: settings.id,
      userId: settings.userId,
      language: settings.language,
      primaryColor: settings.primaryColor,
      secondaryColor: settings.secondaryColor,
      theme: settings.theme,
    };
  }

  private isUniqueViolation(error: unknown): error is { code: string } {
    return typeof error === 'object' && error !== null && 'code' in error && error.code === '23505';
  }
}

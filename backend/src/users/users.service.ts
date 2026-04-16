import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettings } from './entities/user-settings.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
  ) {}

  findOneById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        settings: true,
      },
    });
  }

  updateSettings(userId: number, payload: Partial<UserSettings>) {
    return this.userSettingsRepository.update({ userId }, payload);
  }
}

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto, UpdateUserDto } from '@/modules/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>, // Inject Repository từ TypeORM
  ) {}

  async findUserByEmail(email: string) {
    const user = await this.authRepository.find({
      where: {
        email: email,
      },
    });

    if (!user) {
      console.log('user not found!');
      return null;
    }

    return user;
  }

  async findUserByRefferCode(referrerCode: string) {
    const user = await this.authRepository.find({
      where: {
        referrerCode: referrerCode,
      },
    });

    if (!user) {
      console.log('referrerCode not found!');
      return null;
    }

    return user;
  }

  async createUser(registerDto: RegisterUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    const newUser = this.authRepository.create({
      ...registerDto,
      password: hashedPassword,
    });

    try {
      return await this.authRepository.save(newUser);
    } catch (e) {
      console.log('e create user', e);
      throw new HttpException('error create user', e);
    }
  }

  async updateUser(id: number, update: UpdateUserDto) {
    const user = await this.authRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return null;
    }

    if (update.fullName) {
      user.fullName = update.fullName;
    }

    if (update.phoneNumber) {
      user.phoneNumber = update.phoneNumber;
    }

    if (update.address) {
      user.address = update.address;
    }

    if (update.isActive) {
      user.isActive = update.isActive;
    }

    if (update.referrerCode) {
      user.referrerCode = update.referrerCode;
    }

    try {
      await this.authRepository.save(user);
    } catch (e) {
      console.log('e', e);
    }

    return null;
  }
}

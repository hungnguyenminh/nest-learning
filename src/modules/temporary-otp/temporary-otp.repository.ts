import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TemporaryOtpEntity } from '@/modules/temporary-otp/entities/temporary-otp.entity';
import { CreateTemporaryOtpDto } from '@/modules/temporary-otp/dto/create-temporary-otp.dto';
import { addMinutes } from 'date-fns';

@Injectable()
export class TemporaryOtpRepository {
  constructor(
    @InjectRepository(TemporaryOtpEntity)
    private readonly tmpOtpRepository: Repository<TemporaryOtpEntity>, // Inject Repository từ TypeORM
  ) {}

  async findOtp(user_id: number) {
    return await this.tmpOtpRepository.findOne({
      where: {
        user_id: user_id,
      },
    });
  }

  async create(createDto: CreateTemporaryOtpDto) {
    const findOtp = await this.findOtp(createDto.user_id);

    const now = new Date();
    const expiresAt = addMinutes(now, 10);

    if (!findOtp) {
      try {
        const tmmOtp = await this.tmpOtpRepository.save({
          ...createDto,
          expiresAt,
        });
        console.log('tmmOtp', tmmOtp);

        return tmmOtp;
      } catch (e) {
        console.log('create otp tmp e', e);
        return null;
      }
    }

    return null;
  }

  async updateOtp(id: number, otp: string) {
    const findOtp = await this.findOtp(id);

    if (!findOtp) {
      return null;
    }

    const now = new Date();
    const expiresAt = addMinutes(now, 10);

    findOtp.otp = otp;
    findOtp.expiresAt = expiresAt;

    let updateUser;
    try {
      updateUser = await this.tmpOtpRepository.save(findOtp);
    } catch (e) {
      console.log('updateUser e', e);
    }

    return updateUser;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateTemporaryOtpDto } from './dto/create-temporary-otp.dto';
import { UpdateTemporaryOtpDto } from './dto/update-temporary-otp.dto';

@Injectable()
export class TemporaryOtpService {
  create(createTemporaryOtpDto: CreateTemporaryOtpDto) {
    return 'This action adds a new temporaryOtp';
  }

  findAll() {
    return `This action returns all temporaryOtp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} temporaryOtp`;
  }

  update(id: number, updateTemporaryOtpDto: UpdateTemporaryOtpDto) {
    return `This action updates a #${id} temporaryOtp`;
  }

  remove(id: number) {
    return `This action removes a #${id} temporaryOtp`;
  }
}

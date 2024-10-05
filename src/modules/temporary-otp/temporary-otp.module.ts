import { Module } from '@nestjs/common';
import { TemporaryOtpService } from './temporary-otp.service';
import { TemporaryOtpController } from './temporary-otp.controller';

@Module({
  controllers: [TemporaryOtpController],
  providers: [TemporaryOtpService],
})
export class TemporaryOtpModule {}

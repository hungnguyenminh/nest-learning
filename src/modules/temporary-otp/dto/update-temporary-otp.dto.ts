import { PartialType } from '@nestjs/mapped-types';
import { CreateTemporaryOtpDto } from './create-temporary-otp.dto';

export class UpdateTemporaryOtpDto extends PartialType(CreateTemporaryOtpDto) {}

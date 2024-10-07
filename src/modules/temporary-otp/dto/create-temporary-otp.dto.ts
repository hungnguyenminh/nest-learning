import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTemporaryOtpDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  otp: string;
}

export class SendOtpDto {
  @IsOptional()
  user_id: number;

  @IsNotEmpty()
  otp: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateTemporaryOtpDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  otp: string;
}

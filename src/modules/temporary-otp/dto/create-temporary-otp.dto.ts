import { IsNotEmpty } from 'class-validator';

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

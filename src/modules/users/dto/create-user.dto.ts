import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;
}

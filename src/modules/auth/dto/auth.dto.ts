import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Optional } from '@nestjs/common';

export class AuthDto {
  username: string;
  password: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @Optional()
  address: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

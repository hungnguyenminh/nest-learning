import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Optional } from '@nestjs/common';

export class AuthDto {
  username: string;
  password: string;
}

export class SendMailDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  fullName: string;
}

export class RegisterUserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Optional()
  address: string;

  @Optional()
  isActive: boolean;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  agencyCode: string;

  @IsOptional()
  agencyLevel: number;

  @IsOptional()
  referrerCode: string;
}

import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
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

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  fullName?: string;

  @IsOptional()
  @IsNotEmpty()
  phoneNumber?: string;

  @IsOptional()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  isActive?: boolean;

  @IsOptional()
  @IsNotEmpty()
  referrerCode?: string;
}

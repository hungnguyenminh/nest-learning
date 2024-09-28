import { IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  bio: string;

  userId: number; // ID của User liên quan
}

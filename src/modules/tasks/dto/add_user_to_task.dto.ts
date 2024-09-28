import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddUserToTaskDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  task_id: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}

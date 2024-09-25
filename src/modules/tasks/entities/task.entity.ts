import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional } from 'class-validator';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  @IsOptional()
  user_id: number;
}

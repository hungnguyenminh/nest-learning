import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { UserEntity } from '@/modules/users/entities/user.entity';

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

  @ManyToMany(() => UserEntity, (user) => user.tasks)
  @JoinTable({
    name: 'task_users',
    joinColumn: {
      name: 'task_id', // Tên cột foreign key của TaskEntity
      referencedColumnName: 'id', // Cột tham chiếu của TaskEntity
    },
    inverseJoinColumn: {
      name: 'user_id', // Tên cột foreign key của UserEntity
      referencedColumnName: 'id', // Cột tham chiếu của UserEntity
    },
  }) // Tạo bảng trung gian
  users: UserEntity[];
}

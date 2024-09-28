import { Module } from '@nestjs/common';
import { TasksService } from '@/modules/tasks/tasks.service';
import { TasksController } from '@/modules/tasks/tasks.controller';
import { ResponseHelper } from '@/helpers/responseHelper';
import { TasksRepository } from '@/modules/tasks/tasks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '@/modules/tasks/entities/task.entity';
import { UsersRepository } from '@/modules/users/users.repository';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService, ResponseHelper, TasksRepository, UsersRepository],
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])], // Đăng ký TaskEntity
})
export class TasksModule {}

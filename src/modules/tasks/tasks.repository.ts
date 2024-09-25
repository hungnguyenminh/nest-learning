import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { TaskEntity } from '@/modules/tasks/entities/task.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>, // Inject Repository từ TypeORM
  ) {}

  async createTask(task: CreateTaskDto): Promise<TaskEntity> {
    // Sử dụng taskRepository để tạo và lưu task
    const createTask = this.taskRepository.create(task); // Sử dụng taskRepository để gọi create

    return this.taskRepository.save(createTask); // Sử dụng taskRepository để gọi save
  }
}

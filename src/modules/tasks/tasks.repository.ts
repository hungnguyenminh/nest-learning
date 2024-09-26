import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTaskDto } from '@/modules/tasks/dto/create-task.dto';
import { TaskEntity } from '@/modules/tasks/entities/task.entity';
import { UpdateTaskDto } from '@/modules/tasks/dto/update-task.dto';

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

  async findAllTask(): Promise<TaskEntity[]> {
    // Sử dụng taskRepository để tạo và lưu task
    return this.taskRepository.find(); // Sử dụng taskRepository để gọi create
  }

  async getOneTask(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<UpdateResult> {
    return this.taskRepository.update(id, data);
  }

  async deleteTask(id: number) {
    try {
      return await this.taskRepository.softDelete(id);
    } catch (e) {
      return e;
    }
  }
}

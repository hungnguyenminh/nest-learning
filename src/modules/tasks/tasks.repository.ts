import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository, UpdateResult } from 'typeorm';
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

  // async findAllTask(): Promise<TaskEntity[]> {
  //   // Sử dụng taskRepository để tạo và lưu task
  //   return this.taskRepository.find(); // Sử dụng taskRepository để gọi create
  // }
  async findAllTask(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<{
    tasks: TaskEntity[];
    total: number;
    totalPage: number;
  }> {
    const condition: FindOptionsWhere<any> = {};

    if (search) {
      condition.name = Like(`%${search}%`);
    }

    const [tasks, total] = await this.taskRepository.findAndCount({
      where: condition,
      take: limit, // Số lượng kết quả mỗi trang
      skip: (page - 1) * limit, // Số lượng kết quả bỏ qua (skip)
    });

    const totalPage = Math.ceil(total / limit);

    return {
      tasks,
      total,
      totalPage,
    };
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

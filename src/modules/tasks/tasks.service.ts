import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from '@/modules/tasks/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TasksRepository) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.createTask(createTaskDto);
  }

  findAll() {
    return this.taskRepository.findAllTask();
  }

  async findOne(id: number) {
    const findOneTask = await this.taskRepository.getOneTask(id);

    if (!findOneTask) {
      throw new NotFoundException(`id not found`);
    }

    return findOneTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const findOneTask = await this.taskRepository.getOneTask(id);

    if (!findOneTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.updateTask(id, updateTaskDto);

    const updatedTask = await this.taskRepository.getOneTask(id);

    return updatedTask;
  }

  async remove(id: number) {
    const findTaskById = await this.taskRepository.getOneTask(id);

    if (!findTaskById) {
      throw new NotFoundException(`id not found`);
    }
    return await this.taskRepository.deleteTask(id);
  }
}

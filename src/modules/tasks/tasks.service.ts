import { Injectable, NotFoundException } from '@nestjs/common';
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

  findOne(id: number) {
    return this.taskRepository.getOneTask(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const findTaskById = await this.taskRepository.getOneTask(id);

      console.log('findTaskById', findTaskById);

      if (!findTaskById) {
        throw new NotFoundException(`id not found`);
      }
    } catch (e) {
      console.log('e', e);
      throw new NotFoundException(`id not found`);
    }

    // console.log('findTaskById', findTaskById);
    //
    // if (!findTaskById) {
    //   throw new NotFoundException(`id not found`);
    // }
    // return this.taskRepository.updateTask(id, updateTaskDto);
  }

  async remove(id: number) {
    const findTaskById = await this.taskRepository.getOneTask(id);

    if (!findTaskById) {
      throw new NotFoundException(`id not found`);
    }
    return await this.taskRepository.deleteTask(id);
  }
}

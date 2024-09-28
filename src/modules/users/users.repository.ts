import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { TaskEntity } from '@/modules/tasks/entities/task.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>, // Inject Repository từ TypeORM
  ) {}

  async createUser(userDto: CreateUserDto) {
    const createUser = await this.userRepository.create(userDto);

    return this.userRepository.save(createUser);
  }

  async findAllTask(
    page: number = 1,
    limit: number = 10,
    search?: string,
  ): Promise<{
    tasks: UserEntity[];
    total: number;
    totalPage: number;
  }> {
    const condition: FindOptionsWhere<any> = {};

    if (search) {
      condition.name = Like(`%${search}%`);
    }

    const [tasks, total] = await this.userRepository.findAndCount({
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
}

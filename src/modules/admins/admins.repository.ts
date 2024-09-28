import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';
import { CreateAdminDto } from '@/modules/admins/dto/create-admin.dto';

@Injectable()
export class AdminsRepository {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly userRepository: Repository<AdminEntity>,
  ) {}

  async createUser(createUserDto: CreateAdminDto): Promise<AdminEntity> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<AdminEntity[]> {
    return await this.userRepository.find({ relations: ['posts', 'profile'] });
  }

  async findOneUser(id: number): Promise<AdminEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['posts', 'profile'],
    });
  }

  async updateUser(
    id: number,
    updateUserDto: CreateAdminDto,
  ): Promise<AdminEntity> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOneUser(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { userSeeder } from '@/database/seeder/userSeeder/dataSeeder'; // Import entity tương ứng

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async seed() {
    // Kiểm tra nếu bảng người dùng đã có dữ liệu, nếu chưa thì seed
    const usersCount = await this.userRepository.count();
    if (usersCount === 0) {
      await this.createUsers();
    }
  }

  private async createUsers() {
    await this.userRepository.save(userSeeder);
    console.log('Seeded users successfully');
  }
}

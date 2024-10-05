import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSeederService } from './userSeeder.service';
import { UserEntity } from '@/modules/users/entities/user.entity'; // Import entity tương ứng

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserSeederService],
})
export class UserSeederModule {}

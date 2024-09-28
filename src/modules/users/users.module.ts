import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ResponseHelper } from '@/helpers/responseHelper';
import { UsersRepository } from '@/modules/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ResponseHelper],
  imports: [TypeOrmModule.forFeature([UserEntity])], // Đăng ký TaskEntity
})
export class UsersModule {}

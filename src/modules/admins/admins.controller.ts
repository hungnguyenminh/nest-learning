import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminsRepository } from '@/modules/admins/admins.repository';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';
import { CreateAdminDto } from '@/modules/admins/dto/create-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly userRepository: AdminsRepository) {}

  @Post()
  async create(@Body() createUserDto: CreateAdminDto): Promise<AdminEntity> {
    return this.userRepository.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<AdminEntity[]> {
    return this.userRepository.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AdminEntity> {
    return this.userRepository.findOneUser(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: CreateAdminDto,
  ): Promise<AdminEntity> {
    return this.userRepository.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}

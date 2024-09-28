import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AdminsRepository } from '@/modules/admins/admins.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService, AdminsRepository],
  imports: [TypeOrmModule.forFeature([AdminEntity])],
})
export class AdminsModule {}

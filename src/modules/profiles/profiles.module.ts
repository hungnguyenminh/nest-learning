import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfileController } from '@/modules/profiles/profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '@/modules/profiles/entities/profile.entity';
import { ProfileRepository } from '@/modules/profiles/profiles.repository';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';

@Module({
  controllers: [ProfileController],
  providers: [ProfilesService, ProfileRepository],
  imports: [TypeOrmModule.forFeature([ProfileEntity, AdminEntity])],
})
export class ProfilesModule {}

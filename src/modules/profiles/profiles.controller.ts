import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProfileRepository } from '@/modules/profiles/profiles.repository';
import { CreateProfileDto } from '@/modules/profiles/dto/create-profile.dto';
import { ProfileEntity } from '@/modules/profiles/entities/profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileRepository: ProfileRepository) {}

  @Post()
  async create(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profileRepository.createProfile(createProfileDto);
  }

  @Get()
  async findAll(): Promise<ProfileEntity[]> {
    return this.profileRepository.findAllProfiles();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProfileEntity> {
    return this.profileRepository.findOneProfile(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    return this.profileRepository.updateProfile(id, updateProfileDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.profileRepository.deleteProfile(id);
  }
}

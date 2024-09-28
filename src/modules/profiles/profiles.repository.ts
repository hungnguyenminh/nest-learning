import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '@/modules/profiles/entities/profile.entity';
import { CreateProfileDto } from '@/modules/profiles/dto/create-profile.dto';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,

    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async createProfile(
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    // const profile = this.profileRepository.create(createProfileDto);
    // return await this.profileRepository.save(profile);
    const { userId, bio } = createProfileDto;

    // Tìm admin (user) dựa trên userId
    const user = await this.adminRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Tạo profile mới và gán user vào profile
    const newProfile = this.profileRepository.create({
      bio,
      user,
    });

    // Lưu profile
    return this.profileRepository.save(newProfile);
  }

  async findAllProfiles(): Promise<ProfileEntity[]> {
    return await this.profileRepository.find({ relations: ['user'] });
  }

  async findOneProfile(id: number): Promise<ProfileEntity> {
    return await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async updateProfile(
    id: number,
    updateProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    await this.profileRepository.update(id, updateProfileDto);
    return this.findOneProfile(id);
  }

  async deleteProfile(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}

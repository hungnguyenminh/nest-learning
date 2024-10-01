import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';
import { Repository } from 'typeorm';
import { PostEntity } from '@/modules/posts/entities/post.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly authRepository: Repository<PostEntity>,
  ) {}

  async createUser() {}
}

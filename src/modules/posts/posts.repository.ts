import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '@/modules/posts/entities/post.entity';
import { CreatePostDto } from '@/modules/posts/dto/create-post.dto';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,

    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    // const post = this.postRepository.create(createPostDto);
    // return await this.postRepository.save(post);

    // Tìm admin dựa trên userId
    const user = await this.adminRepository.findOne({
      where: { id: createPostDto.userId },
    });
    if (!user) {
      throw new NotFoundException(
        `User with id ${createPostDto.userId} not found`,
      );
    }

    // Tạo bài viết và liên kết với user (admin)
    const newPost = this.postRepository.create({
      ...createPostDto,
      user, // Gán user vào post
    });

    // Lưu bài viết
    return this.postRepository.save(newPost);
  }

  async findAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async findOnePost(id: number): Promise<PostEntity> {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async updatePost(
    id: number,
    updatePostDto: CreatePostDto,
  ): Promise<PostEntity> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOnePost(id);
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}

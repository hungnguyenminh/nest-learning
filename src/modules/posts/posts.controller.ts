import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostRepository } from '@/modules/posts/posts.repository';
import { CreatePostDto } from '@/modules/posts/dto/create-post.dto';
import { PostEntity } from '@/modules/posts/entities/post.entity';

// Mỗi User có thể có nhiều Post (One-to-Many).
//   Mỗi Post chỉ thuộc về một User (Many-to-One).
//   Mỗi User có một Profile (One-to-One).
//   Mỗi Profile chỉ thuộc về một User (One-to-One).

@Controller('posts')
export class PostController {
  constructor(private readonly postRepository: PostRepository) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postRepository.createPost(createPostDto);
  }

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postRepository.findAllPosts();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postRepository.findOnePost(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postRepository.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.postRepository.deletePost(id);
  }
}

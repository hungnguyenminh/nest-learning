import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostController } from '@/modules/posts/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@/modules/posts/entities/post.entity';
import { PostRepository } from '@/modules/posts/posts.repository';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';

@Module({
  controllers: [PostController],
  providers: [PostsService, PostRepository],
  imports: [TypeOrmModule.forFeature([PostEntity, AdminEntity])],
})
export class PostsModule {}

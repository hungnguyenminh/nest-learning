import { TasksModule } from '@/modules/tasks/tasks.module';
import { UsersModule } from '@/modules/users/users.module';
import { AdminsModule } from '@/modules/admins/admins.module';
import { PostsModule } from '@/modules/posts/posts.module';
import { ProfilesModule } from '@/modules/profiles/profiles.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/modules/auth/auth.service';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { PostsService } from '@/modules/posts/posts.service';
import { PostRepository } from '@/modules/posts/posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@/modules/posts/entities/post.entity';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';
import { Module } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { UsersRepository } from '@/modules/users/users.repository';
import { ResponseHelper } from '@/helpers/responseHelper';
import { TasksService } from '@/modules/tasks/tasks.service';
import { TasksRepository } from '@/modules/tasks/tasks.repository';
import { TaskEntity } from '@/modules/tasks/entities/task.entity';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { ProfilesService } from '@/modules/profiles/profiles.service';
import { ProfileRepository } from '@/modules/profiles/profiles.repository';
import { ProfileEntity } from '@/modules/profiles/entities/profile.entity';
import { AuthController } from '@/modules/auth/auth.controller';
import { TasksController } from '@/modules/tasks/tasks.controller';
import { UsersController } from '@/modules/users/users.controller';
import { ProfileController } from '@/modules/profiles/profiles.controller';
import { PostController } from '@/modules/posts/posts.controller';

@Module({
  controllers: [
    AuthController,
    TasksController,
    UsersController,
    ProfileController,
    PostController,
    AuthController,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    TasksService,
    ResponseHelper,
    TasksRepository,
    UsersRepository,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PostsService,
    PostRepository,
    UsersService,
    UsersRepository,
    ProfilesService,
    ProfileRepository,
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret-auth-jwt',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([
      TaskEntity,
      UserEntity,
      PostEntity,
      AdminEntity,
      UserEntity,
      ProfileEntity,
    ]),
  ],
})
export class SharedModule {}

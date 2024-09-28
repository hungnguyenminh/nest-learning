import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from '@/modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Tạo biến môi trường có thể sử dụng toàn cục
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Đảm bảo ConfigModule đã được import
      inject: [ConfigService], // Inject ConfigService để lấy các giá trị từ .env
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'), // string
        port: parseInt(configService.get<string>('DB_PORT')), // int
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Đừng bật trong môi trường production
      }),
    }),
    TasksModule,
    UsersModule,
  ],
})
export class AppModule {}

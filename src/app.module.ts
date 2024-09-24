import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Tạo biến môi trường có thể sử dụng toàn cục
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Đảm bảo ConfigModule đã được import
      inject: [ConfigService], // Inject ConfigService để lấy các giá trị từ .env
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Đường dẫn đến entity
        synchronize: true, // Chỉ nên bật ở môi trường phát triển, không dùng trong production
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}

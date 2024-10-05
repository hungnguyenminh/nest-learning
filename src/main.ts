import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UserSeederService } from '@/database/seeder/userSeeder/userSeeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Kích hoạt ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các field không được khai báo trong DTO
      forbidNonWhitelisted: true, // Chặn các field không khai báo trong DTO
      transform: true, // Tự động chuyển đổi dữ liệu thành kiểu mong muốn
    }),
  );

  // Kiểm tra biến môi trường để thực thi seed
  const seeder = app.get(UserSeederService);
  await seeder.seed(); // Thực thi seed

  await app.listen(8080);
}
bootstrap();

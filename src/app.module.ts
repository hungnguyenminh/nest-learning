import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from '@/modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { PostsModule } from './modules/posts/posts.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Đảm bảo ConfigModule đã được import
      inject: [ConfigService], // Inject ConfigService để lấy các giá trị từ .env
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587, // 465 cho SSL hoặc 587 nếu sử dụng TLS
          secure: false, // true cho SSL, false cho TLS
          auth: {
            user: configService.get<string>('MAILDEV_INCOMING_USER'),
            pass: configService.get<string>('MAILDEV_INCOMING_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <no-reply@localhost>`,
        },
        // preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
    TasksModule,
    UsersModule,
    AdminsModule,
    PostsModule,
    ProfilesModule,
    AuthModule,
  ],
})
export class AppModule {}

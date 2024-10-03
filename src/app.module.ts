import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CategoriesModule } from './modules/categories/categories.module';
import { CommissionsModule } from './modules/commissions/commissions.module';
import { SettingModule } from './modules/setting/setting.module';
import { SaleModule } from './modules/sale/sale.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderProductModule } from './modules/order_product/order_product.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CartsModule } from './modules/carts/carts.module';
import { CartProductModule } from './modules/cart_product/cart_product.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductsModule } from './modules/products/products.module';
import { CartProductModule } from './modules/cart_product/cart_product.module';
import { CategoriesModule } from './modules/categories/categories.module';

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
    UsersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    CartProductModule,
    CartsModule,
    OrdersModule,
    OrderProductModule,
    PaymentModule,
    SaleModule,
    SettingModule,
    CommissionsModule,
  ],
})
export class AppModule {}

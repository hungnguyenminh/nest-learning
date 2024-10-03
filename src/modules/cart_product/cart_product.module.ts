import { Module } from '@nestjs/common';
import { CartProductService } from './cart_product.service';
import { CartProductController } from './cart_product.controller';

@Module({
  controllers: [CartProductController],
  providers: [CartProductService],
})
export class CartProductModule {}

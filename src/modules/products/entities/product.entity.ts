import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';
import { CartEntity } from '@/modules/carts/entities/cart.entity';
import { OrderEntity } from '@/modules/orders/entities/order.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name_product: string;

  @Column()
  code_product: string;

  @Column()
  image: string;

  @Column()
  attribute: string;

  @Column()
  description: string;

  @Column()
  expire: string;

  @Column()
  manufacturer: string;

  @Column()
  price: string;

  @Column()
  stock_quantity: string;

  @Column()
  quantity_sold: string;

  @Column()
  country_of_manufacture: string;

  @Column()
  storage_conditions: string;

  @Column()
  dosage_and_usage: string;

  @Column()
  contraindicated: string;

  @Column()
  drug_interactions: string;

  @Column()
  side_ffects: string;

  @Column()
  category_id: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deleted_at: Date;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  categories: CategoryEntity[];

  @ManyToMany(() => CartEntity, (cart) => cart.product)
  cart: CartEntity[];

  @ManyToMany(() => OrderEntity, (order) => order.product)
  order: OrderEntity[];
}

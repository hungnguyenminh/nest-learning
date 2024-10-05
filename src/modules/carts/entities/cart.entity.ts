import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { CategoryEntity } from '@/modules/categories/entities/category.entity';
import { ProductEntity } from '@/modules/products/entities/product.entity';

@Entity({ name: 'carts' })
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  quantity: number;

  @Column()
  total: number;

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

  @OneToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.cart)
  product: CategoryEntity[];
}

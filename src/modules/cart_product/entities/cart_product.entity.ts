import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cart_product' })
export class CartProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cart_id: string;

  @Column()
  product_id: string;

  @Column()
  quantity: string;

  @Column()
  total_price: string;

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
}

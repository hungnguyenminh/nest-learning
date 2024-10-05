import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { CommissionEntity } from '@/modules/commissions/entities/commission.entity';
import { ProductEntity } from '@/modules/products/entities/product.entity';
import { PaymentEntity } from '@/modules/payment/entities/payment.entity';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  total: string;

  @Column()
  quantity: string;

  @Column()
  paid: string;

  @Column()
  status: string;

  @Column()
  price: string;

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

  @OneToOne(() => CommissionEntity, (commission) => commission.order)
  commission: CommissionEntity;

  @OneToOne(() => PaymentEntity, (payment) => payment.order)
  payment: PaymentEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.order)
  product: ProductEntity[];
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '@/modules/users/entities/user.entity';
import { OrderEntity } from '@/modules/orders/entities/order.entity';

@Entity({ name: 'commissions' })
export class CommissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  order_id: string;

  @Column()
  order_product_id: string;

  @Column()
  commission_percent: string;

  @Column()
  commission_amount: string;

  @Column()
  status: string;

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

  @OneToOne(() => UserEntity, (user) => user.commission)
  user: UserEntity;

  @OneToOne(() => OrderEntity, (order) => order.commission)
  order: UserEntity;
}

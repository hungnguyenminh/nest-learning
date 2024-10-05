import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommissionEntity } from '@/modules/commissions/entities/commission.entity';
import { SaleEntity } from '@/modules/sale/entities/sale.entity';
import { CartEntity } from '@/modules/carts/entities/cart.entity';
import { OrderEntity } from '@/modules/orders/entities/order.entity';
import { SettingEntity } from '@/modules/setting/entities/setting.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  referrerCode: string;

  @Column({ type: 'varchar', nullable: true })
  agencyCode: string;

  @Column({ nullable: true })
  agencyLevel: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => CommissionEntity, (commission) => commission.user)
  commission: CommissionEntity;

  @OneToOne(() => SaleEntity, (sale) => sale.user)
  sale: SaleEntity;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  cart: CartEntity;

  @OneToOne(() => SettingEntity, (setting) => setting.user)
  setting: SettingEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}

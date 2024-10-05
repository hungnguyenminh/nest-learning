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

@Entity({ name: 'sales' })
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  agency_parent: string;

  @Column()
  agency_children: string;

  @Column()
  total_order: string;

  @Column()
  total_price: string;

  @Column()
  total_commission_price: string;

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

  @OneToOne(() => UserEntity, (user) => user.sale)
  user: UserEntity;
}

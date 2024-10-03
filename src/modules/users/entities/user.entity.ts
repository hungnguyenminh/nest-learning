import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  agency_code: string;

  @Column()
  agency_level: number;

  @Column()
  referal_agent_code: string;

  @Column()
  sales: number;

  @Column()
  password: string;

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

import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @OneToOne(() => AdminEntity, (user) => user.profile)
  user: AdminEntity;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'temporary-otp' })
export class TemporaryOtpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  otp: string;

  @Column({
    type: 'timestamp',
  })
  expiresAt: Date;
}

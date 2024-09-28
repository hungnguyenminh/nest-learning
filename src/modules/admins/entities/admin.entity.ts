import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '@/modules/posts/entities/post.entity';
import { ProfileEntity } from '@/modules/profiles/entities/profile.entity';

@Entity('admins')
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn()
  profile: ProfileEntity;
}

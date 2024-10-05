import { ProductEntity } from '@/modules/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nameCategories: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  totalProduct: number;

  @Column({ type: 'int' })
  totalProductPaid: number;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];
}

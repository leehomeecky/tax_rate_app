import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tax } from './Tax';

export enum productServiceCategoryEnum {
  PRODUCT = 'PRODUCT',
  SERVICE = 'SERVICE',
}

@Entity()
export class ProductAndService {
  constructor(data: ProductAndService) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: string;

  @OneToMany(() => Tax, ({ productService }) => productService, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  tax?: Tax[];

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', unique: true })
  shortName?: string;

  @Column({ type: 'enum', enum: Object.values(productServiceCategoryEnum) })
  category: productServiceCategoryEnum;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}

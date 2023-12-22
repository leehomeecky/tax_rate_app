import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from './Country';
import { ProductAndService } from './ProductAndService';
import { TaxLookUpHistory } from './TaxLookUpHistory';

@Entity()
export class Tax {
  constructor(data: Tax) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: string;

  @ManyToOne(() => Country, (country) => country.tax)
  @JoinColumn()
  country: Country;

  @ManyToOne(() => ProductAndService, (productService) => productService.tax)
  @JoinColumn()
  productService: ProductAndService;

  @OneToMany(() => TaxLookUpHistory, ({ tax }) => tax, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  lookUpHistory?: TaxLookUpHistory[];

  @Column({ type: 'varchar', default: 0 })
  taxRate?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}

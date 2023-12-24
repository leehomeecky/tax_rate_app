import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tax } from './Tax';

@Entity()
export class TaxLookUpHistory {
  constructor(data: TaxLookUpHistory) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: string;

  @ManyToOne(() => Tax, ({ lookUpHistory }) => lookUpHistory)
  @JoinColumn()
  tax: Tax;

  @Column({ type: 'varchar', default: 0 })
  amount?: number;

  @Column({ type: 'varchar', default: 0 })
  quantity?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}

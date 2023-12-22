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
import { Tax } from './Tax';
import { Region } from './Region';

@Entity()
export class Country {
  constructor(data: Country) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: string;

  @OneToMany(() => Tax, ({ country }) => country, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  tax?: Tax[];

  @ManyToOne(() => Region, (region) => region.name)
  @JoinColumn()
  region: Region;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  countryCode: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}

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
import { Country } from './Country';

export enum BaseRegionShortNameEnum {
  LATAM = 'LATAM',
  CAR = 'CAR',
  US = 'US',
}

@Entity()
export class Region {
  constructor(data: Region) {
    if (typeof data === 'object') {
      Object.keys(data).forEach((index) => {
        this[index] = data[index];
      });
    }
  }

  @PrimaryGeneratedColumn()
  id?: string;

  @OneToMany(() => Country, (country) => country.region, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  @JoinColumn()
  country?: Country[];

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  shortName: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, TableInheritance, DeleteDateColumn, OneToMany, ManyToOne,
} from 'typeorm';
import { User } from '../user';
import { Doctor } from '../doctors/doctor.entity';
import { Laboratory } from '../laboratory/laboratory.entity';
import { Agency } from '../agency/agency.entity';
import { Hospital } from '../hospitals/hospital.entity';
import { Patient } from '../patients/patient.entity';

@Entity({
  name: 'product',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string  ;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({default: 0})
  rating: number;

  @Column()
  stock: number;

  @Column({length: 255})
  grade: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  // Add this column to your entity!
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Laboratory, lab => lab.products)
  laboratory: Laboratory;

}

export class ProductFillableFields {
  name: string;
  description: string;
  rating: number;
  stock: number;
  grade: string;
}

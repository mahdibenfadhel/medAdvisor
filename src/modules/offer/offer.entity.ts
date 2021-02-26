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
  name: 'offer',
})
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string  ;

  @Column({ length: 255 })
  type: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column({default: 0})
  price: number;

  @Column({ length: 255 })
  includes: string;

  @Column({ length: 255 })
  excludes: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  // Add this column to your entity!
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Agency, agency => agency.offers)
  agency: Agency;


}

export class OfferFillableFields {
  type: string;
  name: string;
  description: string;
  includes: string;
  excludes: string;
  price: number;

}

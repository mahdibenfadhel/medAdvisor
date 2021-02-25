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
  name: 'comments',
})
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string  ;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  content: string;

  @Column({default: 0})
  rating: number;

  @Column({default: 0})
  relevant: number;

  @Column({default: 0})
  irrelevant: number;


  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  // Add this column to your entity!
  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => User, user => user.comments)
  commentedOn: User;

  @ManyToOne(() => User, patient => patient.comments)
  commenting: User;

}

export class CommentFillableFields {
  title: string;
  content: string;
  rating: number;
  relevant: number;
  irrelevant: number;
}

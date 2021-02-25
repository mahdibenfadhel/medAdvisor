import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, ChildEntity, OneToMany,
} from 'typeorm';
import { PasswordTransformer, User } from '../user';
import { Comment } from '../comments/comment.entity';

@ChildEntity()
export class Doctor extends User {

  @Column({ type: 'date'})
  birthday: Date;

  @Column({ length: 255 })
  description: string;


  @Column({ length: 255 })
  speciality: string;


  @Column({ length: 255 })
  facility: string;

  @Column({default: 0})
  rating: number;

}

export class DoctorFillableFields {
  firstName: string;
  lastName: string;
  email: string;
  speciality: string;
  birthday: Date;
  description: string;
  facility: string;
  rating: number;
  password: string;
}

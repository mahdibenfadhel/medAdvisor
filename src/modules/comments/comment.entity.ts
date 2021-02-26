import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, DeleteDateColumn, ManyToOne,
} from 'typeorm';
import { User } from '../user';

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

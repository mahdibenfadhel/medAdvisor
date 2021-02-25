import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, TableInheritance, DeleteDateColumn, OneToMany,
} from 'typeorm';
import { PasswordTransformer } from './password.transformer';
import { Comment } from '../comments/comment.entity';

@Entity({
  name: 'users',
})
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string  ;

  @Column({ length: 255 })
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ length: 255})
  email: string;

  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  // Add this column to your entity!
  @DeleteDateColumn()
  deletedAt?: Date;

  toJSON() {
    const { password, ...self } = this;
    return self;
  }

  @OneToMany(() => Comment, comment => comment.commentedOn)
  comments: Comment[];
}

export class UserFillableFields {
  firstName: string;
  lastName: string;
  email: string;
  speciality: string;
  birthday: String;
  description: string;
  facility: string;
  rating: number;
  password: string;
}

import {
  Column,
  ChildEntity,
} from 'typeorm';
import {  User } from '../user';

@ChildEntity()
export class Hospital extends User {

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  documents: string;

  @Column({ default: 0 })
  rating: number;
}



import {
  Column,
  ChildEntity, OneToMany,
} from 'typeorm';
import {  User } from '../user';
import { Comment } from '../comments/comment.entity';

@ChildEntity()
export class Agency extends User {

  @Column({ length: 255})
  address: string;


}

export class AgencyFillableFields {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
}

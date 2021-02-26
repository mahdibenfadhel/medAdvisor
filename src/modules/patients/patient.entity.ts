import {
  Column,
  ChildEntity,
} from 'typeorm';
import {  User } from '../user';

@ChildEntity()
export class Patient extends User {

  @Column({ length: 255 })
  profilePic: string;

  @Column({ type: 'date'})
  birthday: Date;

}



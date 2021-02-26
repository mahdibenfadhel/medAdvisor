import {
  Column,
 ChildEntity, ManyToOne,
} from 'typeorm';
import {  User } from '../user';
import { Agency } from '../agency/agency.entity';

@ChildEntity()
export class Doctor extends User {

  @Column({ type: 'date'})
  birthday: Date;

  @Column({ length: 255 })
  description: string;


  @Column({ length: 255 })
  spokenLanguages: string;


  @Column({ length: 255 })
  experience: string;

  @Column({ length: 255 })
  education: string;

  @Column({ length: 255 })
  speciality: string;

  @Column({ length: 255 })
  facility: string;

  @Column({default: 0})
  rating: number;

  @Column({ length: 255})
  documents: string;

  @ManyToOne(() => Agency, agency => agency.doctors)
  agency: Agency;

}



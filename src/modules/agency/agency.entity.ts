import {
  Column,
  ChildEntity, OneToMany,
} from 'typeorm';
import {  User } from '../user';
import { Doctor } from '../doctors/doctor.entity';
import { Offer } from '../offer/offer.entity';

@ChildEntity()
export class Agency extends User {

  @Column({ length: 255})
  description: string;

  @Column({ length: 255})
  documents: string;

  @OneToMany(() => Doctor, doctor => doctor.agency)
  doctors: Doctor[];

  @OneToMany(() => Offer, offer => offer.agency)
  offers: Offer[];

}


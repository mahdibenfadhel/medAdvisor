import {
  Column,
  ChildEntity, OneToMany,
} from 'typeorm';
import {  User } from '../user';
import { Comment } from '../comments/comment.entity';
import { Product } from '../products/product.entity';

@ChildEntity()
export class Laboratory extends User {

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  documents: string;

  @OneToMany(() => Product, product => product.laboratory)
  products: Product[];

  @Column({ default: 0 })
  rating: number;

}

export class LaboratoryFillableFields {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  password: string;
}

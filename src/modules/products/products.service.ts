import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../comments/comment.entity';
import { getConnection, Repository } from 'typeorm';
import { Product, ProductFillableFields } from './product.entity';
import { Laboratory } from '../laboratory/laboratory.entity';
import { ProductPayload } from './productPayload/productPayload';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
  }

  private readonly comment: Comment[] = [];

  async get(id: string) {
    return this.productRepository.findOne(id);
  }

  async create(payload: ProductFillableFields, laboratory: Laboratory) {

    let product = new Product();
    product.description = payload.description;
    product.grade = payload.grade;
    product.rating = payload.rating;
    product.name = payload.name;
    product.stock = payload.stock;
    product.laboratory = laboratory;

    return await this.productRepository.save(this.productRepository.create(product));
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['laboratory'] });
  }

  async updateProduct(updatedProduct: ProductPayload, id) {
    const p = await this.get(id);
    if (!p) {
      throw new NotAcceptableException(
        'no such prod',
      );
    }
    p.description = updatedProduct.description;
    p.grade = updatedProduct.grade;
    p.rating = updatedProduct.rating;
    p.name = updatedProduct.name;
    p.stock = updatedProduct.stock;
    return await this.productRepository.save(p);
  }


  async deleteProduct(id) {
    const product = await this.get(id);

    if (!product) {
      throw new NotAcceptableException(
        'no such comment',
      );
    }
    await this.productRepository.softDelete(id);
    return { success: true };
  }
}

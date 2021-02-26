import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { Agency } from '../agency/agency.entity';
import { OfferPayload } from './offerPayload/offerPayload';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  private readonly offer: Offer[] = [];
  async get(id: string) {
    return this.offerRepository.findOne(id);
  }

  async create(payload: OfferPayload, agency: Agency) {

    let offer = new Offer();
    offer.description = payload.description;
    offer.excludes = payload.excludes;
    offer.includes = payload.includes;
    offer.name = payload.name;
    offer.price = payload.price;
    offer.type = payload. type;
    offer.agency = agency;

    return await this.offerRepository.save(this.offerRepository.create(offer));
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find({ relations: ['agency'] } );
  }

  async updateOffer(updatedOffer: OfferPayload, id) {
    const offer = await this.get(id);
    if (!offer) {
      throw new NotAcceptableException(
        'no such offer',
      );
    }
    offer.description = updatedOffer.description;
    offer.excludes = updatedOffer.excludes;
    offer.includes = updatedOffer.includes;
    offer.name = updatedOffer.name;
    offer.price = updatedOffer.price;
    offer.type = updatedOffer. type;
    await this.offerRepository.save(offer);
    const updatedProd = await this.get(id);
    return { success: true, user: updatedProd };
  }

  async deleteOffer(id) {
    const offer = await this.get(id);

    if (!offer) {
      throw new NotAcceptableException(
        'no such offer',
      );
    }
    await this.offerRepository.softDelete(id);
    return { success: true };
  }
}

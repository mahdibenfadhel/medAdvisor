import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Doctor } from './doctor.entity';
import { UserFillableFields } from '../user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDoctorPayload } from './doctorsPayload/UpdateDoctor.payload';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  protected readonly doctor: Doctor[] = [];
  async get(id: string) {
    return this.doctorRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.doctorRepository
      .createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', email)
      .getOne();
  }


  async create(payload: UserFillableFields) {

    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'doc with provided email already created.',
      );
    }
    return await this.doctorRepository.save(this.doctorRepository.create(payload));
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }


  async updateDoctor(updateDoctor: UpdateDoctorPayload, id) {
    const user = await this.get(id);

    if (!user) {
      throw new NotAcceptableException(
        'no such userPayload',
      );
    }
     await this.doctorRepository.update(id, updateDoctor);
    const userUpdated = await this.get(id);
    return { success: true, user: userUpdated };
  }

  async deleteDoctor(id) {
    const user = await this.get(id);

    if (!user) {
      throw new NotAcceptableException(
        'no such userPayload',
      );
    }
     await this.doctorRepository.softDelete(id);
    return { success: true };
  }
}

import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '../config';
import { JwtService } from '@nestjs/jwt';
import { Doctor } from './doctor.entity';
import { User, UserFillableFields } from '../user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateDoctorPayload } from './UpdateDoctor.payload';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private readonly doctor: Doctor[] = [];
  async get(id: number) {
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
        'no such user',
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
        'no such user',
      );
    }
     await this.doctorRepository.softDelete(id);
    return { success: true };
  }
}

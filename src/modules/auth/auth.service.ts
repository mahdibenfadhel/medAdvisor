import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../../utils/Hash';
import { ConfigService } from './../config';
import { LoginPayload } from './login.payload';
import { Doctor } from '../doctors/doctor.entity';
import { User, UsersService } from '../user';
import { RegisterUserPayload } from './authPayload/registerUserPayload';
import { UserTypes } from '../common/enum/userTypes.enum';
import { getConnection } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Hospital } from '../hospitals/hospital.entity';
import { Laboratory } from '../laboratory/laboratory.entity';
import { Agency } from '../agency/agency.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UsersService,

  ) {}

  async createToken(user: User) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user,
    };
  }
  async getByEmail(email: string) {
    return await getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.email = :email", { email: email })
      .getOne();
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user =  await this.userService.getByEmail(payload.email);
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }

  async create(payload: RegisterUserPayload) {
    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'doc with provided email already created.',
      );
    }

    switch (payload.type){
      case UserTypes.Patient:
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Patient)
          .values(
            payload
          )
          .execute();
        break;
      case UserTypes.Doctor:
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Doctor)
          .values(
            payload
          )
          .execute();
        break;
      case UserTypes.Hospital:
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Hospital)
          .values(
            payload
          )
          .execute();
        break;
      case UserTypes.Laboratory:
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Laboratory)
          .values(
            payload
          )
          .execute();
        break;
      case UserTypes.Agency:
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(Agency)
          .values(
            payload
          )
          .execute();
        break;
      default:
        throw new NotAcceptableException(
          'User type incorrect',
        );
    }
    return await this.getByEmail(payload.email);

  }
}

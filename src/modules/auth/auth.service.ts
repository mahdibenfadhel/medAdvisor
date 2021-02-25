import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../../utils/Hash';
import { ConfigService } from './../config';
import { LoginPayload } from './login.payload';
import { Doctor } from '../doctors/doctor.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createToken(user: Doctor) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: user.id }),
      user,
    };
  }

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = null;
      // await this.userService.getByEmail(payload.email);
    if (!user || !Hash.compare(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials!');
    }
    return user;
  }
}

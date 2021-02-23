import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { AuthService, JwtStrategy } from '../auth';
import {  UserModule } from '../user';
import { ConfigModule, ConfigService } from '../config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Doctor } from './doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    UserModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            ...(configService.get('JWT_EXPIRATION_TIME')
              ? {
                expiresIn: Number(configService.get('JWT_EXPIRATION_TIME')),
              }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService, JwtStrategy, AuthService],
  exports: [DoctorsService, PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class DoctorsModule {}

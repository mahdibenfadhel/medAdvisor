import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import {  AuthService } from '../auth';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '../config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  exports: [UsersService],
    providers: [UsersService],
  controllers: [UserController],
})
export class UserModule {}

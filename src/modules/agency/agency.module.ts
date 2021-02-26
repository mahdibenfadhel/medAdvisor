import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { Agency } from './agency.entity';
import { UserModule } from '../user';
import { ConfigModule, ConfigService } from '../config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService, JwtStrategy } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([Agency]),
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
    })],
  providers: [AgencyService, JwtStrategy, AuthService],
  controllers: [AgencyController]
})export class AgencyModule {}

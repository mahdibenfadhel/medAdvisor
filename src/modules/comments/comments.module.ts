import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../config';
import { AuthService, JwtStrategy } from '../auth';
import { UserModule } from '../user';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports:[TypeOrmModule.forFeature([Comment]),
    ConfigModule,
    DoctorsModule,
    UserModule,
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
  providers: [CommentsService, JwtStrategy, AuthService],
  controllers: [CommentsController]
})
export class CommentsModule {}

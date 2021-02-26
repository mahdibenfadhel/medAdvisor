import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comments/comment.entity';
import { ConfigModule, ConfigService } from '../config';
import { DoctorsModule } from '../doctors/doctors.module';
import { UserModule } from '../user';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Product } from './product.entity';
import { AuthService, JwtStrategy } from '../auth';

@Module({
  imports:[TypeOrmModule.forFeature([Product]),
    ConfigModule,
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
  providers: [ProductsService,  JwtStrategy, AuthService],
  controllers: [ProductsController]
})
export class ProductsModule {}

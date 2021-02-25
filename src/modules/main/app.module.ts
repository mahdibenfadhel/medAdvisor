import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from 'modules/config';
import { AuthModule } from 'modules/auth';
import { CommonModule } from 'modules/common';
import { DoctorsModule } from '../doctors/doctors.module';
import { Patient } from '../patients/patient.entity';
import { PatientsModule } from '../patients/patients.module';
import { CommentsModule } from '../comments/comments.module';
import { LaboratoryModule } from '../laboratory/laboratory.module';
import { AgencyModule } from '../agency/agency.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,DoctorsModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.get('DB_SYNC') === 'true',
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    ConfigModule,
    AuthModule,
    CommonModule,
    CommentsModule,
    PatientsModule,
    LaboratoryModule,
    AgencyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Unique } from 'modules/common';
import { SameAs } from 'modules/common/validator/same-as.validator';
import { User } from '../user.entity';


export class RegisterUserPayload {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @Unique([User])
  email: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  lastName: string;


  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  speciality: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  description: string;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  type: string;


  facility: string;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  rating: number;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @ApiProperty({ required: true })
  @SameAs('password')
  passwordConfirmation: string;
}

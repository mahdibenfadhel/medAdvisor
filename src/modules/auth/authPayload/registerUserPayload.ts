import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Unique } from 'modules/common';
import { SameAs } from 'modules/common/validator/same-as.validator';
import { User } from '../../user';
import { UserTypes } from '../../common/enum/userTypes.enum';

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
    required: true,  enum: UserTypes, enumName: 'type'
  })
  @IsNotEmpty()
  type: UserTypes;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  lastName: string;


  @ApiProperty({
    required: false,
  })
  speciality: string;

  @ApiProperty({
    required: false,
  })
  birthday: string;

  @ApiProperty({
    required: false,
  })
  description: string;

  @ApiProperty({
    required: false,
  })
  facility: string;

  @ApiProperty({
    required: false,default: 0
  })
  rating: number;

  @ApiProperty({
    required: false
  })
  address: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @ApiProperty({ required: true })
  @SameAs('password')
  passwordConfirmation: string;

  @ApiProperty({
    required: false,
  })
  spokenLanguages: string;

  @ApiProperty({
    required: false,
  })
  experience: string;

  @ApiProperty({
    required: false,
  })
  education: string;

  @ApiProperty({
    required: false,
  })
  profilePic: string;

  @ApiProperty({
    required: false,
  })
  documents: string;

}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Unique } from 'modules/common';
import { SameAs } from 'modules/common/validator/same-as.validator';

export class CreateCommentPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  rating: number;


  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  relevant: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  irrelevant: number;

}

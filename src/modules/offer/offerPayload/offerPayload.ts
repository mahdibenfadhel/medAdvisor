import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class OfferPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  price: number;


  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  includes: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  excludes: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

}

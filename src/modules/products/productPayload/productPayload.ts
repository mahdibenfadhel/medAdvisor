import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class ProductPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  rating: number;


  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  stock: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  grade: string;

}

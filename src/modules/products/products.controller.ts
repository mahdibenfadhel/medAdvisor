import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { ProductPayload } from './productPayload/productPayload';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private productService: ProductsService){}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  @ApiResponse({ status: 201, description: 'created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Request() request, @Body() createProd: ProductPayload): Promise<any> {
    const comment = await this.productService.create(createProd, request.user);
    return {success: true, data: comment};
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInDoctor(@Request() request): Promise<any> {
    return this.productService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put(':productId')
  @ApiParam({ name: 'productId' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updatedProduct(@Param('commentId') commentId, @Body() updatedProduct: ProductPayload): Promise<any> {
    return await this.productService.updateProduct(updatedProduct, commentId);

  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('soft/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteProduct(@Param('id') id): Promise<any> {
    return await this.productService.deleteProduct(id);

  }

}

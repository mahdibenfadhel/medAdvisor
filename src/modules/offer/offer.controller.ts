import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OfferService } from './offer.service';
import { OfferPayload } from './offerPayload/offerPayload';

@Controller('offer')
@ApiTags('offers')

export class OfferController {
  constructor(private offerService: OfferService){}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post()
  @ApiResponse({ status: 201, description: 'created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Request() request, @Body() createProd: OfferPayload): Promise<any> {
    const comment = await this.offerService.create(createProd, request.user);
    return {success: true, data: comment};
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInDoctor(@Request() request): Promise<any> {
    return this.offerService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put(':offerId')
  @ApiParam({ name: 'offerId' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateDoctor(@Param('commentId') commentId, @Body() updatedOffer: OfferPayload): Promise<any> {
    return await this.offerService.updateOffer(updatedOffer, commentId);

  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('soft/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteOffer(@Param('id') id): Promise<any> {
    return await this.offerService.deleteOffer(id);

  }

}


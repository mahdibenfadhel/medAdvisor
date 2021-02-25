import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { ApiResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDoctorPayload } from './doctorsPayload/registerDoctor.payload';
import { UpdateDoctorPayload } from './doctorsPayload/UpdateDoctor.payload';
import { AuthService } from '../auth';

@Controller('doctors')
@ApiTags('doctors')
export class DoctorsController {
  constructor(
    private doctorService: DoctorsService,
  private authService: AuthService,) {}

  @Post()
  @ApiResponse({ status: 201, description: 'created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createDoctor: RegisterDoctorPayload): Promise<any> {
    const doctor = await this.doctorService.create(createDoctor);
    return await this.authService.createToken(doctor);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInDoctor(@Request() request): Promise<any> {
    return this.doctorService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateDoctor(@Param('id') id, @Body() updateDoctor: UpdateDoctorPayload): Promise<any> {
   return await this.doctorService.updateDoctor(updateDoctor, id);

  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('soft/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteDoctor(@Param('id') id): Promise<any> {
    return await this.doctorService.deleteDoctor(id);

  }
}

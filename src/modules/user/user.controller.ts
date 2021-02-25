import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserPayload } from './userPayload/registerUserPayload';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createUser: RegisterUserPayload): Promise<any> {
    const user = await this.userService.create(createUser);
    return 0
    // await this.authService.createToken(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInDoctor(@Request() request): Promise<any> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('soft/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteDoctor(@Param('id') id): Promise<any> {
    return await this.userService.deleteUser(id);

  }
}

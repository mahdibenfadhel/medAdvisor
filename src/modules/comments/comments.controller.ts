import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentPayload } from './commentsPayload/createCommentPayload';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDoctorPayload } from '../doctors/doctorsPayload/UpdateDoctor.payload';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
  constructor(private commentService: CommentsService){}

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Post(':userId')
  @ApiParam({ name: 'userId' })
  @ApiResponse({ status: 201, description: 'created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Request() request, @Param('userId') userId, @Body() createComment: CreateCommentPayload): Promise<any> {
    const comment = await this.commentService.create(createComment, request.user, userId);
    return {success: true, data: comment};
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Get()
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getLoggedInDoctor(@Request() request): Promise<any> {
    return this.commentService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Put(':commentId')
  @ApiParam({ name: 'commentId' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateDoctor(@Param('commentId') commentId, @Body() updatedComment: CreateCommentPayload): Promise<any> {
    return await this.commentService.updateComment(updatedComment, commentId);

  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @Delete('soft/:id')
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Successful Response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteDoctor(@Param('id') id): Promise<any> {
    return await this.commentService.deleteComment(id);

  }

}

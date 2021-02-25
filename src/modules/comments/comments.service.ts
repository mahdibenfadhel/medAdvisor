import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from '../doctors/doctor.entity';
import { Repository } from 'typeorm';
import {getRepository} from "typeorm";
import { Comment } from './comment.entity';
import { CreateCommentPayload } from './commentsPayload/createCommentPayload';
import { User } from '../user';
import { Patient } from '../patients/patient.entity';
import { UpdateDoctorPayload } from '../doctors/doctorsPayload/UpdateDoctor.payload';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  private readonly comment: Comment[] = [];
  async get(id: string) {
    return this.commentRepository.findOne(id);
  }

  async create(payload: CreateCommentPayload, commentingUser: User, userId: string) {
    const commentedUser = await getRepository(User)
      .createQueryBuilder("user")
      .where("userPayload.id = :id", { id: userId })
      .getOne();

    if (!commentedUser) {
      throw new NotAcceptableException(
        'no such userPayload exist',
      );
    }
let comment = new Comment();
    comment.title = payload.title;
    comment.content = payload.content;
    comment.rating = payload.rating;
    comment.relevant = payload.relevant;
    comment.irrelevant = payload.irrelevant;
    comment.commentedOn = commentedUser;
    comment.commenting = commentingUser;

   return await this.commentRepository.save(this.commentRepository.create(comment));
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['commenting','commentedOn'] } );
  }

  async updateComment(updatedComment: CreateCommentPayload, id) {
    const comment = await this.get(id);

    if (!comment) {
      throw new NotAcceptableException(
        'no such comment',
      );
    }
    await this.commentRepository.update(id, updatedComment);
    const updatedComm = await this.get(id);
    return { success: true, user: updatedComm };
  }

  async deleteComment(id) {
    const comment = await this.get(id);

    if (!comment) {
      throw new NotAcceptableException(
        'no such comment',
      );
    }
    await this.commentRepository.softDelete(id);
    return { success: true };
  }

}

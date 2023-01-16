import { inject } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { Component } from '../../entities/component.type.js';
import { MovieServiceInterface } from '../movie/movie.service.interface.js';
import { CommentServiceInterface } from './comment.service.interface.js';
import { CommentRoute } from './constants.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { Request, Response } from 'express';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/common.js';
import CommentResponse from './response/comment.model.response.js';
import { HttpMethod } from '../../entities/route.interface.js';

export default class CommentController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.MovieServiceInterface) private  readonly movieService: MovieServiceInterface) {
    super(logger);

    this.logger.info('Register routes for CommentController.');
    this.addRoute<CommentRoute>({
      path: CommentRoute.ROOT,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  public async create({body}: Request<object, object, CreateCommentDto>, res: Response): Promise<void> {
    if (!await this.movieService.exists(body.movieId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Movie with id ${body.movieId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create(body);
    await this.movieService.increaseCommentsCount(body.movieId);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}

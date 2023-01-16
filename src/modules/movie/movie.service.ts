import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { MovieServiceInterface } from './movie.service.interface.js';
import { MovieEntity } from './movie.entity.js';
import { Component } from '../../entities/component.type.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { MOVIE_DISPLAY_LIMIT } from './constants.js';
import MovieDto from './dto/movie.dto';

@injectable()
export default class MovieService implements MovieServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private  readonly logger: LoggerInterface,
    @inject(Component.MovieModel) private readonly movieModel: types.ModelType<MovieEntity>
  ) {}

  async create(dto: MovieDto): Promise<DocumentType<MovieEntity>> {
    const movie = await this.movieModel.create(dto);
    this.logger.info(`New movie created: ${dto.movieName}`);

    return movie;
  }

  async updateById(movieId: string, dto: MovieDto): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel.findByIdAndUpdate(movieId, dto).populate('user');
  }

  async deleteById(movieId: string): Promise<void | null> {
    return this.movieModel.findByIdAndDelete(movieId);
  }

  async find(): Promise<DocumentType<MovieEntity>[]> {
    return this.movieModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          let: { movieId: '$_id' },
          pipeline: [
            { $match: { $expr: { $in: ['$$movieId', '$movies'] } } },
            { $project: { _id: 1 } }
          ],
          as: 'comments'
        },
      },
      {
        $addFields: {
          id: { $toString: '$_id' },
          commentsCount: { $size: '$comments' },
          rating: { $avg: '$comments.rating' }
        }
      },
      { $unset: 'comments' },
      { $limit: MOVIE_DISPLAY_LIMIT }
    ]);
  }

  async findByGenre(genre: string, limit?: number): Promise<DocumentType<MovieEntity>[]> {
    return this.movieModel.find({genre}, {}, {limit}).populate('user');
  }

  async findById(movieId: string): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel.findById(movieId).populate('user');
  }

  async findPromo(): Promise<DocumentType<MovieEntity> | null> {
    return this.movieModel.findOne({isPromo: true}).populate('user');
  }

  async increaseCommentsCount(movieId: string): Promise<void | null> {
    return this.movieModel.findByIdAndUpdate(movieId, {$inc: {commentsCount: 1}});
  }

  async updateMovieRating(movieId: string, newRating: number): Promise<void | null> {
    const oldValues = await this.movieModel.findById(movieId).select('rating commentsCount');
    const oldRating = oldValues?.['rating'] ?? 0;
    const oldCommentsCount = oldValues?.['commentsCount'] ?? 0;
    return this.movieModel.findByIdAndUpdate(movieId, {
      rating: (oldRating * oldCommentsCount + newRating) / (oldCommentsCount + 1)
    });
  }

  async exists(documentId: string): Promise<boolean> {
    return (this.movieModel.exists({_id: documentId})) !== null;
  }
}

import { DocumentType } from '@typegoose/typegoose';
import { MovieEntity } from './movie.entity.js';
import MovieDto from './dto/movie.dto';
import { DocumentExistsInterface } from '../../entities/document-exists.interface.js';

export interface MovieServiceInterface extends DocumentExistsInterface {
  create(dto: MovieDto, userId: string): Promise<DocumentType<MovieEntity>>;
  updateById(movieId: string, dto: MovieDto): Promise<DocumentType<MovieEntity> | null>;
  deleteById(movieId: string): Promise<void | null>;
  find(limit?: number): Promise<DocumentType<MovieEntity>[]>;
  findByGenre(genre: string, limit?: number): Promise<DocumentType<MovieEntity>[]>;
  findById(movieId: string): Promise<DocumentType<MovieEntity> | null>;
  findPromo(): Promise<DocumentType<MovieEntity> | null>;
  increaseCommentsCount(movieId: string): Promise<void | null>;
  updateMovieRating(movieId: string, newRating: number): Promise<void | null>;
}

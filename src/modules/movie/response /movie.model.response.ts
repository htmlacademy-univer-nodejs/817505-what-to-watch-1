import { Expose, Type } from 'class-transformer';
import { TGenre } from '../../../entities/movie.type';
import UserResponse from '../../user/response/user.model.response.js';

export default class MovieModelResponse {
  @Expose()
  public movieName!: string;

  @Expose()
  public movieDescription!: string;

  @Expose()
  public publishDate!: number;

  @Expose()
  public genre!: TGenre;

  @Expose()
  public releaseYear!: number;

  @Expose()
  public rating!: number;

  @Expose()
  public previewVideoPath!: string;

  @Expose()
  public videoPath!: string;

  @Expose()
  public actors!: string[];

  @Expose()
  public director!: string;

  @Expose()
  public movieDuration!: number;

  @Expose()
  public commentsCount!: number;

  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public posterPath!: string;

  @Expose()
  public backgroundPath!: string;

  @Expose()
  public backgroundColor!: string;
}

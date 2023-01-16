import { Expose, Type } from 'class-transformer';
import { TGenre } from '../../../entities/movie.type';
import UserResponse from '../../user/response/user.model.response.js';

export default class MovieListItemResponse {
  @Expose()
  public movieName!: string;

  @Expose()
  public publishDate!: number;

  @Expose()
  public genre!: TGenre;

  @Expose()
  public previewVideoPath!: string;

  @Expose()
  @Type(() => UserResponse)
  public user!: UserResponse;

  @Expose()
  public posterPath!: string;

  @Expose()
  public commentsCount!: number;
}

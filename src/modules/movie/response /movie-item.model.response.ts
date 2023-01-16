import { Expose } from 'class-transformer';
import { TGenre } from '../../../entities/movie.type';

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
  public userId!: string;

  @Expose()
  public posterPath!: string;

  @Expose()
  public commentsCount!: number;
}

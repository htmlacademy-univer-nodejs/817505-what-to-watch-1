import { TGenre } from '../../../entities/movie.type.js';

export default class MovieDto {
  public movieName!: string;
  public movieDescription!: string;
  public publishDate!: Date;
  public genre!: TGenre | undefined;
  public releaseYear!: number;
  public rating!: number;
  public previewVideoPath!: string;
  public videoPath!: string;
  public actors!: string[];
  public director!: string;
  public movieDuration!: number;
  public commentsCount!: number;
  public userId!: string;
  public posterPath!: string;
  public backgroundPath!: string;
  public backgroundColor!: string;
}

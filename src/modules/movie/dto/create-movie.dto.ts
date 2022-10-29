import { TUser } from '../../../entities/user.type.js';
import { TGenre } from '../../../entities/movie.type.js';

export default class CreateMovieDto {
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
  public commentsAmount!: number;
  public user!: TUser;
  public posterPath!: string;
  public backgroundPath!: string;
  public backgroundColor!: string;
}

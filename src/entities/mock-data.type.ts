import { TUser } from './user.type';
import { TGenre } from './movie.type';

export type TMockData = {
  movieName: string[];
  movieDescription: string[];
  publishDate: Date[];
  genre: TGenre[];
  releaseYear: number[];
  rating: number[];
  previewVideoPath: string[];
  videoPath: string[];
  actors: string[][];
  director: string[];
  movieDuration: number[];
  commentsAmount: number[];
  user: TUser[];
  posterPath: string[];
  backgroundPath: string[];
  backgroundColor: string[];
}

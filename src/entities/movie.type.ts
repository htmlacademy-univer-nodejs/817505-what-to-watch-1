import { TUser } from './user.type';


export const GENRE = ['comedy',  'crime',  'documentary',  'drama',  'horror',  'family',  'romance',  'scifi',  'thriller'];
export type TGenre = typeof GENRE[number]
export const isRightGenre = (genre: string) => GENRE.includes(genre) ? genre : undefined;

export type TMovie = {
  movieName: string;
  movieDescription: string;
  publishDate: Date;
  genre: TGenre | undefined;
  releaseYear: number;
  rating: number;
  previewVideoPath: string;
  videoPath: string;
  actors: string[];
  director: string;
  movieDuration: number;
  commentsCount: number;
  user: TUser;
  posterPath: string;
  backgroundPath: string;
  backgroundColor: string;
  isPromo?: boolean;
}

import { StatusCodes } from 'http-status-codes';
import HttpError from '../common/errors/http-error.js';
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

export enum Genres {
  COMEDY = 'comedy',
  CRIME = 'crime',
  DOCUMENTARY = 'documentary',
  DRAMA = 'drama',
  HORROR = 'horror',
  FAMILY = 'family',
  ROMANCE = 'romance',
  SCIFI = 'scifi',
  THRILLER = 'thriller'
}

export function getGenre(value: string): TGenre | never {
  if (!GENRE.includes(value)) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `Unrecognised genre: ${value}.`,
      'getGenre'
    );
  }
  return value;
}

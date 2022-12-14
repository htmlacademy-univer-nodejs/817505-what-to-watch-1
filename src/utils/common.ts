import crypto from 'crypto';
import { isRightGenre, TMovie } from '../entities/movie.type.js';

export const createMovie = (row: string): TMovie => {
  const tokens = row.replace('\n', '').split('\t');
  const [
    movieName,
    movieDescription,
    publishDate,
    genre,
    releaseYear,
    rating,
    previewVideoPath,
    videoPath,
    actors,
    director,
    movieDuration,
    name,
    email,
    avatarPath,
    password,
    posterPath,
    backgroundPath,
    backgroundColor,
  ] = tokens;

  return {
    movieName,
    movieDescription,
    publishDate: new Date(publishDate),
    genre: isRightGenre(genre),
    releaseYear: parseInt(releaseYear, 10),
    rating: parseFloat(rating),
    previewVideoPath,
    videoPath,
    actors: actors.split(','),
    director,
    movieDuration: parseFloat(movieDuration),
    commentsAmount: 0,
    user: {
      name,
      email,
      avatarPath,
      password,
    },
    posterPath,
    backgroundPath,
    backgroundColor,
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';


export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

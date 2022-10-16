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
    commentsAmount,
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
    commentsAmount: parseFloat(commentsAmount),
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

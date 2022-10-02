import { readFileSync } from 'fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { isRightGenre, TMovie } from '../../entities/movie.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): TMovie[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
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
      ]) => ({
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
      }));
  }
}

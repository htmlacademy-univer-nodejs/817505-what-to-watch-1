import dayjs from 'dayjs';
import { generateRandomValue, getRandomItem } from '../../utils/random.js';
import { MovieGeneratorInterface } from './movie-generator.interface';
import { TMockData } from '../../entities/mock-data.type';
import { TGenre } from '../../entities/movie.type';
import { TUser } from '../../entities/user.type';

const MIN_RATING = 1;
const MAX_RATING = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class MovieGenerator implements MovieGeneratorInterface {
  constructor(private readonly mockData: TMockData) {}

  public generate(): string {
    const movieName = getRandomItem<string>(this.mockData.movieName);
    const movieDescription = getRandomItem<string>(this.mockData.movieDescription);
    const publishDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const genre = getRandomItem<TGenre>(this.mockData.genre);
    const releaseYear = getRandomItem(this.mockData.releaseYear);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const previewVideoPath = getRandomItem<string>(this.mockData.previewVideoPath);
    const videoPath = getRandomItem<string>(this.mockData.videoPath);
    const actors = getRandomItem<string[]>(this.mockData.actors).join(';');
    const director = getRandomItem<string>(this.mockData.director);
    const movieDuration = getRandomItem<number>(this.mockData.movieDuration);
    const commentsAmount = getRandomItem<number>(this.mockData.commentsAmount);
    const user = getRandomItem<TUser>(this.mockData.user);
    const posterPath = getRandomItem<string>(this.mockData.posterPath);
    const backgroundPath = getRandomItem<string>(this.mockData.backgroundPath);
    const backgroundColor = getRandomItem<string>(this.mockData.backgroundColor);

    const { name, email, avatarPath, password } = user;
    return [
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
      backgroundColor
    ].join('\t');
  }
}

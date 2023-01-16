import { Genres, TGenre } from '../../../entities/movie.type.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min
} from 'class-validator';

export default class MovieDto {
  @IsString({message: 'movieName is required'})
  @Length(2, 100, {message: 'length from 2 to 100 symbols'})
  public movieName!: string;

  @IsString({message: 'movieDescription is required'})
  @Length(20, 1024, {message: 'length from 20 to 1024 symbols'})
  public movieDescription!: string;

  @IsDateString({}, {message: 'must be valid ISO date'})
  public publishDate!: Date;

  @IsEnum(Genres, {message: 'genre must be one of: \'comedy\', \'crime\', \'documentary\', \'drama\', \'horror\', \'family\', \'romance\', \'scifi\', \'thriller\''})
  public genre!: TGenre | undefined;

  @IsInt({message: 'must be an integer'})
  @Min(1895, {message: 'max releaseYear is 1895'})
  @Max(2022, {message: 'min releaseYear is 2022'})
  public releaseYear!: number;

  @IsString({message: 'previewVideoPath is required'})
  public previewVideoPath!: string;

  @IsString({message: 'videoPath is required'})
  public videoPath!: string;

  @IsArray({message: 'actors must be an array'})
  public actors!: string[];

  @IsString({message: 'director is required'})
  public director!: string;

  @IsInt({message: 'movieDuration must be an integer'})
  @Min(0, {message: 'movieDuration can not be less than 0'})
  public movieDuration!: number;

  @Matches(/(\S+(\.jpg)$)/, {message: 'posterPath must be .jpg format image'})
  @IsString({message: 'posterPath is required'})
  public posterPath!: string;

  @Matches(/(\S+(\.jpg)$)/, {message: 'backgroundPath must be .jpg format image'})
  @IsString({message: 'backgroundPath is required'})
  public backgroundPath!: string;

  @IsString({message: 'backgroundColor is required'})
  public backgroundColor!: string;

  @IsOptional()
  @IsBoolean({message: 'isPromo should be boolean'})
  public isPromo?: boolean;
}

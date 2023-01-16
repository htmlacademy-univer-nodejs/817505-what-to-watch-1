import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { GENRE, TGenre } from '../../entities/movie.type.js';
import { UserEntity } from '../user/user.entity.js';
import { Types } from 'mongoose';

const { prop, modelOptions } = typegoose;

export interface MovieEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'movies'
  }
})
export class MovieEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public movieName!: string;

  @prop({trim: true, required: true})
  public movieDescription!: string;

  @prop({required: true})
  public publishDate!: Date;

  @prop({type: () => String, required: true, enum: GENRE})
  public genre!: TGenre | undefined;

  @prop({required: true})
  public releaseYear!: number;

  @prop({required: true, default: 0})
  public rating!: number;

  @prop({required: true, trim: true})
  public previewVideoPath!: string;

  @prop({required: true, trim: true})
  public videoPath!: string;

  @prop({required: true})
  public actors!: string[];

  @prop({required: true, minlength: 2, maxlength: 50, trim: true})
  public director!: string;

  @prop({required: true})
  public movieDuration!: number;

  @prop({default: 0})
  public commentsCount!: number;

  @prop({
    type: Types.ObjectId,
    ref: UserEntity,
    required: true
  })
  public user!: Ref<UserEntity>;

  @prop({required: true, match: /(\S+(\.jpg)$)/, trim: true})
  public posterPath!: string;

  @prop({required: true, match: /(\S+(\.jpg)$)/, trim: true})
  public backgroundPath!: string;

  @prop({required: true, trim: true})
  public backgroundColor!: string;

  @prop()
  public isPromo?: boolean;
}

export const MovieModel = getModelForClass(MovieEntity);

import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'required field'})
  @Length(5, 1024, {message: '5 to 1024 symbols'})
  public text!: string;

  @IsInt({message: 'must be an integer'})
  @Min(0, {message: 'min rating is 0'})
  @Max(10, {message: 'max rating is 10'})
  public rating!: number;

  @IsMongoId({message: 'movieId field must be valid id'})
  public movieId!: string;
}

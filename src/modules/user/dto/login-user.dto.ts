import { IsEmail, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be valid'})
  public email!: string;

  @IsString({message: 'required'})
  public password!: string;
}

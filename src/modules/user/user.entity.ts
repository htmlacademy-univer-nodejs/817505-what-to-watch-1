import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { TUser } from '../../entities/user.type.js';
import { checkPassword, createSHA256 } from '../../utils/common.js';
import { DEFAULT_AVATAR_FILE_NAME } from './constants.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  constructor(data: TUser) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatarPath = data.avatarPath;
  }

  @prop({unique: true, required: true})
  public email!: string;

  @prop({default: DEFAULT_AVATAR_FILE_NAME})
  public avatarPath?: string;

  @prop({required: true})
  public name!: string;

  @prop({required: true, default: []})
  public moviesToWatch!: string[];

  @prop({required: true})
  private password!: string;

  setPassword(password: string, salt: string) {
    checkPassword(password);
    this.password = createSHA256(password, salt);
  }

  verifyPassword(password: string, salt: string) {
    return createSHA256(password, salt) === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);

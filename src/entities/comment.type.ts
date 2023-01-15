import { TUser } from './user.type';

export type TComment = {
  text: string;
  rating: number;
  publishingDate: number;
  author: TUser;
}

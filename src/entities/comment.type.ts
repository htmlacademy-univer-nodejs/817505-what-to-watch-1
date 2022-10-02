import { TUser } from './user.type';

export type TComment = {
  commentText: string;
  rating: number;
  publishDate: Date;
  commentAuthor: TUser;
}

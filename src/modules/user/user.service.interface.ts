import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { MovieEntity } from '../movie/movie.entity';
import CreateUserDto from './dto/create-user.dto.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findToWatch(userId: string): Promise<DocumentType<MovieEntity>[]>;
  addToWatch(movieId: string, userId: string): Promise<void | null>;
  deleteToWatch(movieId: string, userId: string): Promise<void | null>;
}

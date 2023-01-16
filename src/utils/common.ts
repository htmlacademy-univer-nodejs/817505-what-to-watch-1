import crypto from 'crypto';
import { isRightGenre, TMovie } from '../entities/movie.type.js';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import * as jose from 'jose';
import { TextEncoder } from 'node:util';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../entities/validation-error-field.type.js';
import { ServiceError } from '../entities/service-error.enum.js';
import { DEFAULT_STATIC_IMAGES } from '../app/app.constants.js';

export const createMovie = (row: string): TMovie => {
  const tokens = row.replace('\n', '').split('\t');
  const [
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
    name,
    email,
    posterPath,
    backgroundPath,
    backgroundColor,
  ] = tokens;

  return {
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
    commentsCount: 0,
    user: {
      name,
      email,
    },
    posterPath,
    backgroundPath,
    backgroundColor,
  };
};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';


export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const checkPassword = (password: string) => {
  if (password.length < 6 || password.length > 12) {
    throw new Error('Password should be from 6 to 12 characters');
  }
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true, enableImplicitConversion: true});

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(new TextEncoder().encode(jwtSecret));

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: Record<string, unknown>,
  transformFn: (object: Record<string, unknown>) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        const obj = Object(someObject[key]);
        transformProperty(property, obj, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data: Record<string, unknown>) => {
  properties.forEach((property) => transformProperty(property, data, (target: Record<string, unknown>) => {
    const rootPath = DEFAULT_STATIC_IMAGES.includes(`${target[property]}`) ? staticPath : uploadPath;
    target[property] = `${rootPath}/${target[property]}`;
  }));
};

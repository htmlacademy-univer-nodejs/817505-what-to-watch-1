export const MOVIE_DISPLAY_LIMIT = 60;
export enum MovieRoute {
  ROOT = '/',
  CREATE = '/create',
  MOVIE = '/:movieId',
  PROMO = '/promo',
  COMMENTS = '/:movieId/comments'
}
export const DEFAULT_MOVIE_POSTER_IMAGES = [
  'aviator.jpg',
  'bohemian-rhapsody.jpg',
  'avatar.jpg',
  'fantastic-beasts-the-crimes-of-grindelwald.jpg',
];

export const DEFAULT_MOVIE_BACKGROUND_IMAGES = [
  'bg-the-grand-budapest-hotel.jpg'
];

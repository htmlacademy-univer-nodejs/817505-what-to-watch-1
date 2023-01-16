import { MiddlewareInterface } from '../../entities/middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import { multipart } from 'express-multipart';

export class MultipartFromDataMiddleware implements MiddlewareInterface {
  constructor(private uploadDirectory: string) {}

  async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    return multipart({
      preserveExtensions: true,
      destination: this.uploadDirectory,
    }).file('avatar')(req, _res, next);
  }
}

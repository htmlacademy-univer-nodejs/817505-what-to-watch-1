import { StatusCodes } from 'http-status-codes';
import { ValidationErrorField } from '../../entities/validation-error-field.type';

export default class ValidationError extends Error {
  httpStatusCode!: number;
  details: ValidationErrorField[] = [];

  constructor(message: string, errors: ValidationErrorField[]) {
    super(message);

    this.httpStatusCode = StatusCodes.BAD_REQUEST;
    this.message = message;
    this.details = errors;
  }
}

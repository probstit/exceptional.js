import {
  IException, ServerException,
  DomainException, ConflictException,
  InputValidationException, NotFoundException
} from './exceptions';

export interface IHttpException {
  statusCode: number,
  error: IException <any>
}

/**
 * High level HTTP API exception class.
 *
 * @author Dragos Sebestin
 */
export class HttpException implements IHttpException {
  public statusCode: number;
  public error: IException<any>;

  constructor (
    base: ServerException<any> | DomainException<any> | ConflictException<any> | InputValidationException<any> | any
  ) {
    if (base instanceof DomainException) {
      this.error = base;
      this.statusCode = 403;
    } else if (base instanceof ConflictException) {
      this.error = base;
      this.statusCode = 409;
    } else if (base instanceof NotFoundException) {
      this.error = base;
      this.statusCode = 404;
    } else if (base instanceof ServerException) {
      this.error = base;
      this.statusCode = 500;
    } else {
      this.error = {
        code: 0,
        namespace: '',
        payload: base
      };
      this.statusCode = 500;
    }
  }
}

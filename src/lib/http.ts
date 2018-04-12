import {
  IException, GenericException,
  DomainException, ConflictException,
  InputValidationException, NotFoundException,
  ThrottleException, UnauthorizedException,
  PaymentRequiredException
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
    base: GenericException<any> | DomainException<any> |
    ConflictException<any> | InputValidationException<any> |
    UnauthorizedException<any> | PaymentRequiredException<any> | any
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
    } else if (base instanceof ThrottleException) {
      this.error = base;
      this.statusCode = 429;
    } else if (base instanceof InputValidationException) {
      this.error = base;
      this.statusCode = 400;
    } else if (base instanceof UnauthorizedException) {
      this.error = base;
      this.statusCode = 401;
    } else if (base instanceof PaymentRequiredException) {
      this.error = base;
      this.statusCode = 402;
    } else if (base instanceof GenericException) {
      this.error = base;
      this.statusCode = 500;
    } else {
      this.error = Object.assign({}, base, {
        namespace: 'default',
        code: 0,
        payload: {}
      });

      if (
        typeof base === 'object' &&
        base !== null
      ) {
        for (const key of Object.getOwnPropertyNames(base)) {
          Object.defineProperty(this.error, key, {
            enumerable: (base as Object).propertyIsEnumerable(key),
            writable: false,
            configurable: false,
            value: base[key]
          });
        }
      } else {
        this.error.payload = base;
      }

      this.statusCode = 500;
    }
  }
}

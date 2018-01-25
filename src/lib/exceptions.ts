/**
 * Exception interface.
 *
 * @author Dragos Sebestin
 */
export interface IException<T> {
  namespace: string,
  code: number,
  payload: T
}

/**
 * Generic type exception class.
 *
 * @author Dragos Sebestin
 */
export class ServerException <T> extends Error implements IException<T> {
  public namespace: string;
  public code: number;
  public payload: T;

  /**
   * Class constructor.
   */
  constructor (ex: IException<T>) {
    super();
    this.namespace = ex.namespace;
    this.code = ex.code;
    this.payload = ex.payload;
  }
}

/**
 * Domain type exception class.
 *
 * @author Dragos Sebestin
 */
export class DomainException <T> extends ServerException<T> {}

/**
 * Resource conflict type exception class.
 *
 * @author Dragos Sebestin
 */
export class ConflictException <T> extends ServerException<T> {}

/**
 * Resource not found type exception class.
 *
 * @author Dragos Sebestin
 */
export class NotFoundException <T> extends ServerException<T> {}

/**
 * Input validation type exception class.
 *
 * @author Dragos Sebestin
 */

export declare type InputExceptionPayloadExtraType = {errors: Array<{[key: string]: any}>};
export class InputValidationException <T> extends ServerException<T & InputExceptionPayloadExtraType> { }

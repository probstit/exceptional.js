import {IException} from './exceptions';
import {IHttpException} from './http';
import {format} from '../main';

/**
 * High level Server API exception class.
 *
 * @author Dragos Sebestin
 */
export class ServerException {
  public message: string;
  public exception: IException<any>;

  /**
   * Class constructor.
   */
  constructor (httpException: IHttpException) {
    this.message = format(httpException.error);
    this.exception = httpException.error;
  }
}

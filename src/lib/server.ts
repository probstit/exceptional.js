import {IException} from './exceptions';
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
  constructor (exception: IException<any>) {
    this.message = format(exception);
    this.exception = exception;
  }
}

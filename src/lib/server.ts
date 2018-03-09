import {IException} from './exceptions';
import {format} from '../main';

/**
 * High level Server API exception class.
 *
 * @author Dragos Sebestin
 */
export class ServerException {
  public status: number;
  public message: string;
  public exception: IException<any>;

  /**
   * Class constructor.
   */
  constructor (status: number, exception: IException<any>) {
    this.status = status;
    this.message = format(exception);
    this.exception = exception;
  }
}

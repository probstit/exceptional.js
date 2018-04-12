import { IException } from '../main';

/**
 * High level client exception class.
 *
 * @author Dragos Sebestin
 */
export class ClientException {
  public error: IException<any>;

  constructor (
    base:  any
  ) {
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
  }
}

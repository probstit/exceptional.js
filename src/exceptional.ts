import {
  IException,
  GenericException as GenericExceptionBase,
  DomainException as DomainExceptionBase,
  ConflictException as ConflictExceptionBase,
  InputValidationException as InputValidationExceptionBase,
  NotFoundException as NotFoundExceptionBase,
  ThrottleException as ThrottleExceptionBase,
  UnauthorizedException as UnauthorizedExceptionBase,
  PaymentRequiredException as PaymentRequiredExceptionBase
} from './lib/exceptions';
import {Namespace} from './lib/namespace';

export class Exceptional {

  /**
   * Private constructor.
   */
  private constructor (
    private _namespace: Namespace
  ) {}

  static create (ns: Namespace) : Exceptional {
    return new Exceptional(ns);
  }

  GenericException <Payload> (code: number, payload: Payload) {
    return this._instantiate<GenericExceptionBase<Payload>, Payload>(
      GenericExceptionBase, code, payload
    );
  }

  DomainException <Payload> (code: number, payload: Payload) {
    return this._instantiate<DomainExceptionBase<Payload>, Payload>(
      DomainExceptionBase, code, payload
    );
  }

  ConflictException <Payload> (code: number, payload: Payload) {
    return this._instantiate<ConflictExceptionBase<Payload>, Payload>(
      ConflictExceptionBase, code, payload
    );
  }

  NotFoundException <Payload> (code: number, payload: Payload) {
    return this._instantiate<NotFoundExceptionBase<Payload>, Payload>(
      NotFoundExceptionBase, code, payload
    );
  }

  InputValidationException <Payload> (
    code: number, payload: Payload
  ): InputValidationExceptionBase<Payload> {
    return this._instantiate<InputValidationExceptionBase<Payload>, Payload>(
      InputValidationExceptionBase, code, payload
    );
  }

  ThrottleException <Payload> (
    code: number, payload: Payload
  ) : ThrottleExceptionBase<Payload> {
    return this._instantiate<ThrottleExceptionBase<Payload>, Payload>(
      ThrottleExceptionBase, code, payload
    );
  }

  UnauthorizedException <Payload> (
    code: number, payload: Payload
  ) : UnauthorizedExceptionBase<Payload> {
    return this._instantiate<UnauthorizedExceptionBase<Payload>, Payload>(
      UnauthorizedExceptionBase, code, payload
    );
  }

  PaymentRequiredException <Payload> (
    code: number, payload: Payload
  ) : PaymentRequiredExceptionBase<Payload> {
    return this._instantiate<PaymentRequiredExceptionBase<Payload>, Payload>(
      PaymentRequiredExceptionBase, code, payload
    );
  }

  private _instantiate <T, Payload> (
    cTor: {new (...args: any[]): T & IException<Payload>},
    code: number, payload: Payload
  ) {
    return new cTor({
      namespace: this._namespace.name,
      code: code,
      payload: payload
    });
  }
}

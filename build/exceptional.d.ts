import { IException, ServerException as ServerExceptionBase, DomainException as DomainExceptionBase, ConflictException as ConflictExceptionBase, InputValidationException as InputValidationExceptionBase, NotFoundException as NotFoundExceptionBase } from './lib/exceptions';
import { Namespace } from './lib/namespace';
export declare class Exceptional {
    private _namespace;
    /**
     * Private constructor.
     */
    private constructor();
    static create(ns: Namespace): Exceptional;
    ServerException<Payload>(code: number, payload: Payload): ServerExceptionBase<Payload> & IException<Payload>;
    DomainException<Payload>(code: number, payload: Payload): DomainExceptionBase<Payload> & IException<Payload>;
    ConflictException<Payload>(code: number, payload: Payload): ConflictExceptionBase<Payload> & IException<Payload>;
    NotFoundException<Payload>(code: number, payload: Payload): NotFoundExceptionBase<Payload> & IException<Payload>;
    InputValidationException<Payload>(code: number, payload: Payload): InputValidationExceptionBase<Payload>;
    private _instantiate<T, Payload>(cTor, code, payload);
}

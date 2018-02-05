import { IException, GenericException, DomainException, ConflictException, InputValidationException, UnauthorizedException, PaymentRequiredException } from './exceptions';
export interface IHttpException {
    statusCode: number;
    error: IException<any>;
}
/**
 * High level HTTP API exception class.
 *
 * @author Dragos Sebestin
 */
export declare class HttpException implements IHttpException {
    statusCode: number;
    error: IException<any>;
    constructor(base: GenericException<any> | DomainException<any> | ConflictException<any> | InputValidationException<any> | UnauthorizedException<any> | PaymentRequiredException<any> | any);
}

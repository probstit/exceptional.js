/**
 * Exception interface.
 *
 * @author Dragos Sebestin
 */
export interface IException<T> {
    namespace: string;
    code: number;
    payload: T;
}
/**
 * Generic type exception class.
 *
 * @author Dragos Sebestin
 */
export declare class GenericException<T> extends Error implements IException<T> {
    namespace: string;
    code: number;
    payload: T;
    /**
     * Class constructor.
     */
    constructor(ex: IException<T>);
}
/**
 * Domain type exception class.
 *
 * @author Dragos Sebestin
 */
export declare class DomainException<T> extends GenericException<T> {
}
/**
 * Resource conflict type exception class.
 *
 * @author Dragos Sebestin
 */
export declare class ConflictException<T> extends GenericException<T> {
}
/**
 * Resource not found type exception class.
 *
 * @author Dragos Sebestin
 */
export declare class NotFoundException<T> extends GenericException<T> {
}
/**
 * Throttle type exception class.
 */
export declare class ThrottleException<T> extends GenericException<T> {
}
/**
 * Input validation type exception class.
 *
 * @author Dragos Sebestin
 */
export declare type InputExceptionPayloadExtraType = {
    errors: Array<{
        [key: string]: any;
    }>;
};
export declare class InputValidationException<T> extends GenericException<T & InputExceptionPayloadExtraType> {
}

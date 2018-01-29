import { IException } from './exceptions';
import { IHttpException } from './http';
/**
 * High level Server API exception class.
 *
 * @author Dragos Sebestin
 */
export declare class ServerException {
    message: string;
    exception: IException<any>;
    /**
     * Class constructor.
     */
    constructor(httpException: IHttpException);
}

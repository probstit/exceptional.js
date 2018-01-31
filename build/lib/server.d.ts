import { IException } from './exceptions';
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
    constructor(exception: IException<any>);
}

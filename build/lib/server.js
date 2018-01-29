"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
/**
 * High level Server API exception class.
 *
 * @author Dragos Sebestin
 */
class ServerException {
    /**
     * Class constructor.
     */
    constructor(httpException) {
        this.message = main_1.format(httpException.error);
        this.exception = httpException.error;
    }
}
exports.ServerException = ServerException;

//# sourceMappingURL=server.js.map

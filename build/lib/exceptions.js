"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generic type exception class.
 *
 * @author Dragos Sebestin
 */
class ServerException extends Error {
    /**
     * Class constructor.
     */
    constructor(ex) {
        super();
        this.namespace = ex.namespace;
        this.code = ex.code;
        this.payload = ex.payload;
    }
}
exports.ServerException = ServerException;
/**
 * Domain type exception class.
 *
 * @author Dragos Sebestin
 */
class DomainException extends ServerException {
}
exports.DomainException = DomainException;
/**
 * Resource conflict type exception class.
 *
 * @author Dragos Sebestin
 */
class ConflictException extends ServerException {
}
exports.ConflictException = ConflictException;
/**
 * Resource not found type exception class.
 *
 * @author Dragos Sebestin
 */
class NotFoundException extends ServerException {
}
exports.NotFoundException = NotFoundException;
class InputValidationException extends ServerException {
}
exports.InputValidationException = InputValidationException;

//# sourceMappingURL=exceptions.js.map

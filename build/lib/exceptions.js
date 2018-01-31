"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generic type exception class.
 *
 * @author Dragos Sebestin
 */
class GenericException extends Error {
    /**
     * Class constructor.
     */
    constructor(ex) {
        super();
        this.namespace = ex.namespace || 'default';
        this.code = ex.code || 0;
        this.payload = ex.payload || {};
    }
}
exports.GenericException = GenericException;
/**
 * Domain type exception class.
 *
 * @author Dragos Sebestin
 */
class DomainException extends GenericException {
}
exports.DomainException = DomainException;
/**
 * Resource conflict type exception class.
 *
 * @author Dragos Sebestin
 */
class ConflictException extends GenericException {
}
exports.ConflictException = ConflictException;
/**
 * Resource not found type exception class.
 *
 * @author Dragos Sebestin
 */
class NotFoundException extends GenericException {
}
exports.NotFoundException = NotFoundException;
/**
 * Throttle type exception class.
 */
class ThrottleException extends GenericException {
}
exports.ThrottleException = ThrottleException;
class InputValidationException extends GenericException {
}
exports.InputValidationException = InputValidationException;

//# sourceMappingURL=exceptions.js.map

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("./exceptions");
/**
 * High level HTTP API exception class.
 *
 * @author Dragos Sebestin
 */
class HttpException {
    constructor(base) {
        if (base instanceof exceptions_1.DomainException) {
            this.error = base;
            this.statusCode = 403;
        }
        else if (base instanceof exceptions_1.ConflictException) {
            this.error = base;
            this.statusCode = 409;
        }
        else if (base instanceof exceptions_1.NotFoundException) {
            this.error = base;
            this.statusCode = 404;
        }
        else if (base instanceof exceptions_1.ThrottleException) {
            this.error = base;
            this.statusCode = 429;
        }
        else if (base instanceof exceptions_1.GenericException) {
            this.error = base;
            this.statusCode = 500;
        }
        else {
            this.error = Object.assign({}, base, {
                code: 0,
                namespace: 'default',
                payload: {}
            });
            if (typeof base === 'object' &&
                base !== null) {
                for (const key of Object.getOwnPropertyNames(base)) {
                    Object.defineProperty(this.error, key, {
                        enumerable: base.propertyIsEnumerable(key),
                        writable: false,
                        configurable: false,
                        value: base[key]
                    });
                }
            }
            else {
                this.error.payload = base;
            }
            this.statusCode = 500;
        }
    }
}
exports.HttpException = HttpException;

//# sourceMappingURL=http.js.map

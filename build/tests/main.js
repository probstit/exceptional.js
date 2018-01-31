"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../lib/http");
const server_1 = require("../lib/server");
const main_1 = require("../main");
const exceptional = main_1.context('default-namespace');
exports.TABLE = {
    namespace: 'default-namespace',
    locale: 'ro',
    errors: {
        0: 'S-a intamplat ceva neprevazut.',
        1: '${message}',
        2: 'Nu poti face o rezervare in trecut.',
        3: '${workerName} ti-a blocat accestul la calendar',
    }
};
main_1.registerTable(exports.TABLE);
let ex = exceptional.GenericException(1, {
    message: 'ce exceptie'
});
console.log(main_1.format(ex));
ex = exceptional.DomainException(1, {
    message: 'ce exceptie'
});
let httpErr = new http_1.HttpException(ex);
console.log(main_1.format(httpErr.error));
let serverErr = new server_1.ServerException(ex);
console.log(serverErr.message);

//# sourceMappingURL=main.js.map

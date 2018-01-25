"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function table(cTor) {
    return class extends cTor {
        constructor() {
            super(...arguments);
            this.namespace = '';
            this.locale = '';
            this.errors = [];
        }
    };
}
exports.table = table;

//# sourceMappingURL=table.js.map

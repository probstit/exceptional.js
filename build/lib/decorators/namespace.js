"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../../main");
const namespace_1 = require("../namespace");
function namespace() {
    return (target, propertyKey, parameterIndex) => {
        target;
        propertyKey;
        parameterIndex;
        let namespace = main_1.namespaceRegistry.get(name);
        if (namespace)
            return namespace;
        namespace = new namespace_1.Namespace(name);
        main_1.namespaceRegistry.set(name, namespace);
        return namespace;
    };
}
exports.namespace = namespace;

//# sourceMappingURL=namespace.js.map

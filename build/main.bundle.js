(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const exceptional_1 = require("./exceptional");
const namespace_1 = require("./lib/namespace");
__export(require("./lib/http"));
__export(require("./lib/server"));
exports.namespaceRegistry = new Map();
function getNamespace(name) {
    let namespace = exports.namespaceRegistry.get(name);
    if (namespace)
        return namespace;
    namespace = new namespace_1.Namespace(name);
    exports.namespaceRegistry.set(name, namespace);
    return namespace;
}
function registerTable(table) {
    let namespace = getNamespace(table.namespace);
    namespace.loadTable(table);
}
exports.registerTable = registerTable;
function context(name) {
    return exceptional_1.Exceptional.create(getNamespace(name));
}
exports.context = context;
/**
 * Format an exception.
 */
function format(ex) {
    let namespace = exports.namespaceRegistry.get(ex.namespace);
    if (!namespace)
        throw `Could not format exception.`;
    return namespace.render(ex);
}
exports.format = format;

})));

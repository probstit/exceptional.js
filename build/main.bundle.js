(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
const exceptional_1 = require("./exceptional");
const namespace_1 = require("./lib/namespace");
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

})));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Namespace {
    /**
     * Class constructor.
     */
    constructor(name) {
        this.name = name;
        this._tables = [];
    }
    /**
     * Load an error table in this namespace.
     */
    loadTable(table) {
        this._tables.push(table);
    }
    /**
     * Render an exception.
     */
    render(ex) {
        // find error table
        let table = this._tables.find(t => t.namespace === this.name);
        if (!table)
            throw `${this.name} has no registered table for ${ex.namespace}.`;
        // get template
        let template = table.errors[ex.code];
        return this._renderTemplate(template, ex.payload);
    }
    /**
     * Render an exception template using a payload.
     */
    _renderTemplate(t, payload) {
        if (!payload)
            return t;
        for (let key in payload) {
            t = t.replace(`\$\{${key}\}`, payload[key]);
        }
        return t;
    }
}
exports.Namespace = Namespace;

//# sourceMappingURL=namespace.js.map

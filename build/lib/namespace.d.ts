import { IErrorTable } from './IErrorTable';
import { IException } from './exceptions';
export declare class Namespace {
    name: string;
    private _tables;
    /**
     * Class constructor.
     */
    constructor(name: string);
    /**
     * Load an error table in this namespace.
     */
    loadTable(table: IErrorTable): void;
    /**
     * Render an exception.
     */
    render(ex: IException<any>): string;
    /**
     * Render an exception template using a payload.
     */
    private _renderTemplate(t, payload);
}

import { Exceptional } from './exceptional';
import { Namespace } from './lib/namespace';
import { IErrorTable } from './lib/IErrorTable';
import { IException } from './lib/exceptions';
export * from './lib/IErrorTable';
export { IException } from './lib/exceptions';
export * from './lib/http';
export * from './lib/server';
export declare let namespaceRegistry: Map<string, Namespace>;
export declare function registerTable(table: IErrorTable): void;
export declare function context(name: string): Exceptional;
/**
 * Format an exception.
 */
export declare function format(ex: IException<any>): string;

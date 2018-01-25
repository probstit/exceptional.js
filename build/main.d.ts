import { Exceptional } from './exceptional';
import { Namespace } from './lib/namespace';
import { IErrorTable } from './lib/IErrorTable';
export * from './lib/IErrorTable';
export { IException } from './lib/exceptions';
export declare let namespaceRegistry: Map<string, Namespace>;
export declare function registerTable(table: IErrorTable): void;
export declare function context(name: string): Exceptional;

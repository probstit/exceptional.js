import {Exceptional} from './exceptional';
import {Namespace} from './lib/namespace';
import {IErrorTable} from './lib/IErrorTable';
export * from './lib/IErrorTable';
export {IException} from './lib/exceptions';

export let namespaceRegistry = new Map<string, Namespace>();
function getNamespace (name: string) {
  let namespace = namespaceRegistry.get(name);
  if (namespace)
    return namespace;

  namespace = new Namespace(name);
  namespaceRegistry.set(name, namespace);
  return namespace;
}

export function registerTable(table: IErrorTable) {
  let namespace = getNamespace(table.namespace);
  namespace.loadTable(table);
}

export function context (name: string) : Exceptional {
  return Exceptional.create(getNamespace(name));
}
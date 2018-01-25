/**
 * Error table interface.
 */
export interface IErrorTable {
  namespace: string,
  locale: string,
  errors: {[key: number]: string}
}

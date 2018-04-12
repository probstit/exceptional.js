import {IErrorTable} from './IErrorTable';
import {IException} from './exceptions';

export class Namespace {
  private _tables: IErrorTable[] = [];

  /**
   * Class constructor.
   */
  constructor (public name: string) {}

  /**
   * Load an error table in this namespace.
   */
  loadTable (table: IErrorTable) {
    this._tables.push(table);
  }

  /**
   * Render an exception.
   */
  render (ex: IException<any>) : string {
    // find error table
    let table = this._tables.find(
      t => t.namespace === this.name
    );

    if (!table)
      throw `${this.name} has no registered table for ${ex.namespace}.`;

    // get template
    let template = table.errors[ex.code];
    // fallback to default error template if one cannot be found
    if (!template)
      template = table.errors[0];

    return this._renderTemplate(template, ex.payload);
  }

  /**
   * Render an exception template using a payload.
   */
  private _renderTemplate (t: string, payload: any) : string {
    if (!payload)
      return t;
    for (let key in payload) {
      t = t.replace(`\$\{${key}\}`, payload[key]);
    }

    return t;
  }
}

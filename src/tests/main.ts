import {IErrorTable} from '../lib/IErrorTable';
import {HttpException} from '../lib/http';
import {ServerException} from '../lib/server';
import {context, registerTable, format} from '../main';
const exceptional = context('default');

export const TABLE: IErrorTable = {
  namespace: 'default',
  locale: 'ro',
  errors: {
    0: 'Something went horribly wrong.',
    1: '${message}',
  }
};
registerTable(TABLE);

let ex = exceptional.GenericException(1, {
  message: 'ce exceptie'
});
console.log(format(ex));
ex = exceptional.DomainException(1, {
  message: 'ce exceptie'
});

let httpErr = new HttpException(ex);
console.log(format(httpErr.error));

httpErr = new HttpException(new Error('Mongo fake exception'));
console.log(format(httpErr.error));
console.log(JSON.stringify(httpErr.error));
console.log((httpErr.error as any).stack);

let serverErr = new ServerException(500, ex);
console.log(serverErr.message);

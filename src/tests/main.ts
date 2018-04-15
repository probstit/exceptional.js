import {IErrorTable} from '../lib/IErrorTable';
import {HttpException} from '../lib/http';
import {ServerException} from '../lib/server';
import {context, registerTable, format, setLocale} from '../main';
import { ClientException } from '../lib/client';
const exceptional = context('default');

const EN_TABLE: IErrorTable = {
  namespace: 'default',
  locale: 'en',
  errors: {
    0: 'Something went horribly wrong.',
    1: '${message}',
  }
};
const RO_TABLE: IErrorTable = {
  namespace: 'default',
  locale: 'ro',
  errors: {
    0: 'S-a intalmplate ceva nasol.',
    1: '${message}',
  }
};
registerTable(EN_TABLE);
registerTable(RO_TABLE);

let ex = exceptional.GenericException(1, {
  message: 'what an exception :O'
});
console.log(format(ex));
ex = exceptional.DomainException(1, {
  message: 'what an exception :O'
});

let httpErr = new HttpException(ex);
console.log(format(httpErr.error));

httpErr = new HttpException(new Error('Mongo fake exception'));
console.log(format(httpErr.error));
console.log(JSON.stringify(httpErr.error));
console.log((httpErr.error as any).stack);

let serverErr = new ServerException(500, ex);
console.log(serverErr.message);

let clientErr = new ClientException(undefined);
console.log(JSON.stringify(clientErr));

clientErr = new ClientException(ex);
console.log(JSON.stringify(clientErr));

// switch loc ale
setLocale('ro');
let ex2 = exceptional.GenericException(0, {});
console.log(format(ex2));

import {IErrorTable} from '../lib/IErrorTable';
import {HttpException} from '../lib/http';
import {ServerException} from '../lib/server';
import {context, registerTable, format} from '../main';
const exceptional = context('default');

export const TABLE: IErrorTable = {
  namespace: 'default',
  locale: 'ro',
  errors: {
    0: 'S-a intamplat ceva neprevazut.',
    1: '${message}',
    2: 'Nu poti face o rezervare in trecut.',
    3: '${workerName} ti-a blocat accestul la calendar',
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

let serverErr = new ServerException(ex);
console.log(serverErr.message);

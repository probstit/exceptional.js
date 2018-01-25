import {IErrorTable} from '../lib/IErrorTable';
import {HttpException} from '../lib/http';
import {context, registerTable, format} from '../main';
const exceptional = context('default-namespace');

export const TABLE: IErrorTable = {
  namespace: 'default-namespace',
  locale: 'ro',
  errors: {
    0: 'S-a intamplat ceva neprevazut.',
    1: '${message}',
    2: 'Nu poti face o rezervare in trecut.',
    3: '${workerName} ti-a blocat accestul la calendar',
  }
};
registerTable(TABLE);

let ex = exceptional.ServerException(1, {
  message: 'ce exceptie'
});
console.log(format(ex));
ex = exceptional.DomainException(1, {
  message: 'ce exceptie'
});

let httpErr = new HttpException(ex);
console.log(format(httpErr.error));

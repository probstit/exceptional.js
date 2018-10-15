# exceptional.js
This is a library aimed at providing a simple error handling mechanism for usage in both Node.JS and in the browser.

Install using npm:
```bash
npm install exceptional.js
```

The code is written in **TypeScript** and better fits projects written in **ES6** and above.
```javascript
import * as exceptional from 'exceptional.js'
```

The library also addresses some of the other pain points of handling errors in node.js apps.

It comes with a model of transporting server side errors to the client in a sane manner, all exceptions have the same format.

Also, the library was built with localization in mind. For projects that have front-ends translated in multiple languages,
errors should also take into account the language preference of the user, not just display error messages in english.
This highly increases the user experience of such applications.

## General usage
This library enforces a certain format for errors. Exceptions should be stateful and carry with them all the neccessary information to describe the error to a user.

```javascript
/**
 * Exception interface.
 */
export interface IException <T> {
  namespace: string,
  code: number,
  payload: T
}
```
The code above is the generic structure of an exception.
It contains information about the namespace (more on this further down), the code that uniquely identifies the error and a payload that can the anyting.

The library makes use of custom error objects that extend the Node.JS Error object.

All types of errors are constructed from a namespace and require the developer to pass in the code and a payload.

Built in exception class types are:
1. **Generic Exception**

   This is the most basic type of error. It doesn't provide much info about what happened. Also, this is the type of error you'll be using when no other fits the use case.

   ```javascript
   throw EXCEPTIONAL.GenericException(1, {debug: 'some-debug-info'});
   ```

2. **Domain Exception**

   The name is borrowed from *Domain Driven Design* terminology. This type of exception is used for signaling an unmet requirement in the action that is performed. Let's say your app doesn't allow a user to create more than 5 resources on your server. This would be the exception to use when that user tries to create the 6th one.
   ```javascript
   throw EXCEPTIONAL.DomainException(1, {debug: 'some-debug-info'});
   ```

3. **Conflict Exception**

   Used to handle a case where there are conflicting resources. E.g. when a user tries to register with an already used email address.
   ```javascript
    throw EXCEPTIONAL.ConflictException(1, {debug: 'some-debug-info'});
   ```

4. **Not Found Exception**

   This exception is to be used when a client tries to access a resource that cannot be found on the server.
   ```javascript
    throw EXCEPTIONAL.NotFoundException(1, {debug: 'some-debug-info'});
   ```

5. **Throttle Exception**

   Used within mechanisms that limit the number of accesses to a certain resource found on the server
   ```javascript
    throw EXCEPTIONAL.ThrottleException(1, {debug: 'some-debug-info'});
   ```

6. **Unauthorized Exception**

   Used to handle unauthorized accesses to a server resource. Either the user is not logged in or does not have the neccessary permissions.
   ```javascript
    throw EXCEPTIONAL.UnauthorizedException(1, {debug: 'some-debug-info'});
   ```

7. **Payment Required Exception**

   Usefull for apps that have a payment system implemented for access to the resources. When a user tries to access his account and his subscription has expired, this type of exception is to be used.
   ```javascript
    throw EXCEPTIONAL.PaymentRequiredException(1, {debug: 'some-debug-info'});
   ```

8. **Input Validation Exception**

   This type of exception is used for signaling that the body of an HTTP request has a field with a different type than what the server was expecting. This type is a bit more special, because it requires that the payload is contains an array with the fields that did not pass validation. It does so because that array can then be used in the client side code to display error messages next to a form's fields. As a best practice, the names of the error fields should match the name of the id assigned to the form control.
   ```javascript
    throw EXCEPTIONAL.InputValidationException(1, {
      errors: [
        'email': 'Not a valid email address',
        'password': 'Should be at least 8 characters long'
      ]
    });
   ```

An error should contain a code (number) which distinctly identifies the sub type. For example, the *NotFoundException* class will be used for any resource accesses that point to a non existing resource, but the code can specify exactly which type of resource could not be found. Code number 1 could be used for a non existing user account, 2 for a missing comment with a certain ID and so on.

## EXCEPTIONAL context
All the build in exceptions are only available through a **CONTEXT** object that is bound to a certain namespace. Tipically, a namespace would reflect a certain part of your application. Let's say we are tasked with building a notes app. We could use one namespace for the part of the app that handles user accounts and another for the code that processes notes.

Having multiple namespaces within your code, allows developers to reuse exception code numbers, thus avoiding reaching really high values for them.

| Namespace | Code | Description        |
| --------- | ---- | ------------------ |
| users     | 1    | Email already used |
| users     | 2    | Not a valid email  |
| users     | 3    | Passwords do not match |
| notes     | 1    | Note title is required |
| notes     | 2    | Note body cannot exceed 256 characters |

Fully fuctioning example of the library usage
```javascript
import { context } from 'exceptional.js'

const EXCEPTIONAL = context('users-namespace');

function foo () {
  if (true) {
    throw EXCEPTIONAL.GenericException(1, {message: 'something went wrong'});
  }
}
```

## Async/Await usage
Exception handling is alot more easy when writting code using the async/await syntax. Code that is known to throw exceptions can be wrapped in `try {} catch () {}` blocks.

Writting code like this allows developers to make services that signal errors by throwing exceptions and only handle them at the top most level.

## Handling HTTP API errors
This is where the fun part beggins. The library comes with a special class of exception named `HttpException`. This type of exception is particularly usefull for HTTP API servers. It encapsulates an HTTP status code and the error that ocurred.

```javascript
export interface IHttpException {
  statusCode: number,
  error: IException <any>
}
```

Noticed the type of the `error` field? It's an `IException<any>`. ALWAYS! So how does it work?

```javascript
let httpEx = new HttpException(err);
```

The HttpException class's constructor takes only 1 parameter. The exception that occurred in the running piece of code.
The smart thing about it is that if ``typeof(err)`` is one of the built in exception classes, it will set the statusCode field to one of the standard HTTP status codes that match that type of exception.

| Exception Class          | HTTP Status Code |
| ---------------------    | :--------------: |
| GenericException         | 500              |
| DomainException          | 403              |
| ConflictException        | 409              |
| NotFoundException        | 404              |
| ThrottleException        | 429              |
| UnauthorizedException    | 401              |
| PaymentRequiredException | 402              |
| InputValidationException | 400              |

If the `err` parameter is anything other than one of the built in exception class objects, the status code will default to `500` and the error field will have the code property set to 0, the namespace `default` and for the payload property, it will copy all of the enumerable properties of the original error.

Ok, ok, but where is the fun part? Well, let me tell you about one of my favourite node.js http frameworks: `Express.js` (duh).

Express comes with a really helpful (but highly unpopular) feature. You can define YOUR OWN ERROR MIDDLEWARE.

```javascript
let app = express();
app.use(function defaultErrorHandler (err, req, res, next) {
  try {
    let httpEx = new HttpException(err);
    res.status(httpEx.statusCode).json(httpEx.error);
  } catch (err) {
    res.status(500).end();
  }
});
```

And now comes the punchline ... *drumroll please*.

```javascript
app.post('/api/v1/user', async (req, res, next) => {
  try {
    await foo({email: req.body.email}); // method that can throw exceptions
    res.end();
  } catch (err) {
    next(err);
  }
});
```

When defining an express route middleware, we could pass for a callback an `async` function so that we can safely use `try catch` blocks. When an exception is thrown, the catch block simply calls the `next` middleware passing along the error object. When this happens, express will skipp all further middleware and execute the special error handler middleware, where we construct an `HttpException` from the received error object and everything else is handled by the library. The status code is automatically determined and error info is sent to the client.

TA DAAAA!! No more passing `req` and `res` objects down to controller methods to control the status code sent to the client.

## Localization
The requirement that an exception must have a code property has two major benefits. First of all, it helps with code verbosity, writting a number is much eassier that an error string. And secondly, an error code can be matched to an error string.

`exceptional.js` provides an API for registering error code tables with multiple language support.

```javascript
/**
 * Error table interface.
 */
export interface IErrorTable {
  namespace: string,
  locale: string,
  errors: {[key: number]: string}
}
```

```javascript
import { registerTable } from 'exceptional.js';

// english error table
registerTable({
  namespace: 'default',
  locale: 'en',
  errors: {
    0: 'Something went wrong.',
    1: 'The email address ${email} is already registered.',
  }
});

// romanian error table
registerTable({
  namespace: 'default',
  locale: 'ro',
  errors: {
    0: 'Something went wrong',
    1: 'Adresa de email ${email} este deja folosita.',
  }
});
```

## Displaying error messages

The locale must be set before right after the error tables have been loaded into the library.

```javascript
import { setLocale } from 'exceptional.js';

setLocale('en');
```

Using the `format` method provided by the library, the error string matching the namespace and code of the passed exception object will be retrieved from the error table with the locale selected.

```javascript
import { format } from 'exceptional.js';

console.log(format(err));
```

**NOTE!** If a string cannot be found in the table with that namespace, the library will try to find a table with the `default` value for the namespace field and search there. If still, no error string can be found it will throw an error.

The library also supports interpolation in the error strings by using the familiar syntax `${key}`, where key is a property on the payload object of an exception class.

```javascript
import { registerTable, context, setLocale } from 'exceptional.js';

registerTable({
  namespace: 'users',
  locale: 'en',
  errors: {
    0: 'Something went wrong.',
    1: 'The email address ${email} is already registered.',
  }
});

setLocale('ro');

const EXCEPTIONAL = context('users');
try {
  throw EXCEPTIONAL.ConflictException(1, {
    email: 'john.doe@email.com'
  });
} catch (err) {
  console.error(format(err));
}
```

This will print in the error console the message:
> The email address john.doe@email.com is already registered.

## Helpers
The library also comes with two more helper classes.
1. **ServerException**

   This comes in handy when logging exceptions on the server
   ```javascript
   app.use(function defaultErrorHandler (err, req, res, next) {
     try {
       let httpEx = new HttpException(err);
       res.status(httpEx.statusCode).json(httpEx.error);

       // log exceptions
       let serverException = new ServerException(httpEx.statusCode, httpEx.error);
       console.error(
         `<===== API_EXCEPTION =====>
          [ROUTE]
          Method: ${req.method}
          Url: ${req.url}
          Body: ${JSON.stringify(req.body)}
          [MESSAGE]
          ${serverException.message}
          [ORIGINAL]
          ${JSON.stringify(serverException.exception)}
          [STACK]
          ${(serverException.exception as any).stack}
          <================ END_EXCEPTION =================>
         `
       );
     } catch (err) {
       res.status(500).end();
     }
   });
   ```

   This class will automatically `format()` the exception and put the resulting error string in the `message` field.

   Also the `stack` property is inherited from the node.js Error class.

   The same class can be used on the client side code to handle error from HTTP requests made to the API server. The only difference is that the stack property is not transported to the client for obvious security reasons.
2. **ClientException**

   Made for client side usage. It will wrap any programmer error that will have an error code of `0` and a namespace of `default`.
   ```javascript
   import { ClientException, format } from 'exceptional.js';

   try {
     let obj = {};
     obj.foo.bar = 10; // will throw 'cannot access property bar of undefined'
   } catch (err) {
     let clientErr = new ClientException(err);
     console.error(format(clientErr.error)); // error field is an IException
   }
   ```

## Final thoughts

Exception handling is one of the most underrated aspects amongst javascript developers and most of them fail to get it right. This hurts the lifecycle of big projects, but with the help of `exceptional.js`, hopefully developers will have the right tools to properly handle exceptions.

Happy coding!

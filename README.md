# try-catch-js

Lots of packages implement similar inline approach to handling errors in JavaScript
without writing `try/catch` blocks. This one is a bit different because it follows
[proposal-try-expression](https://github.com/isiahmeadows/proposal-try-expression).

## Install

```bash
npm install try-catch-js --save
```

## Usage

### Asynchronously

`tryAsync` accepts either a `Promise` object or an `async` function that will be
executed in order to get a promise. Resolved or rejected value is stored under
`value` property, but if the promise is rejected `caught` property
will be set to `true`.

If an `async` function is given then additional arguments to pass are supported.

###### Example

```ts
import { tryAsync } from 'try-catch-js';

interface User {
  id: string
  name: string
}

async function getUser(id: string): Promise<User> {
  if (id !== '1') {
    throw new Error('User was not found');
  }
  
  return { id: '1', name: 'John' };
}

async function asyncExample(): Promise<void> {
  const result = await tryAsync<User, Error>(getUser('1')); // as a promise
  // or const result = await tryAsync<User, Error>(getUser, '1'); // as an async func
  
  if (result.caught) {
    // Contains thrown/rejected value
    return console.dir(result.value);
  }
  
  // Contains user data
  console.dir(result.value);
}
```

### Synchronously

Similar to `tryAsync`, but accepts only a regular function with optional parameters.

###### Example

```ts
import { trySync } from 'try-catch-js';

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero!');
  }
  
  return a / b;
}

function syncExample(): void {
  const result = trySync<number, Error>(divide, 10, 5);
  
  if (result.caught) {
    return console.dir(result.value);
  }

  console.dir(result.value);
}
```